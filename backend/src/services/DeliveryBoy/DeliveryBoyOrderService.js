const Orders = require('../../models/OrderModel');
const orderService = require('../OrderService');
const { CustomError } = require('../../utils/errors/CustomError')
const DeliveryBoyOrder = require('../../models/DeliveryBoy/DeliveryBoyOrderModel')
const deliveryBoyService = require('./DeliveryBoyService');
const paymentService = require('../PaymentService');

exports.getOrdersByPostalCodeForDeliveryBoy = async (postalCode) => {
    const orders = await Orders.find({ postalCode }).populate('foodItemsData.food');
    return orders;
}

exports.AcceptOrderByDeliveryBoy = async (orderId, deliveryBoyId) => {
    const order = await orderService.getOrderById(orderId);
    if (order.orderStatus !== 'Processing') {
        throw new CustomError("Order is already accepted by another delivery boy.");
    } else {
        const deliveryBoy = await deliveryBoyService.updateDeliveriesOfDeliveryBoy(deliveryBoyId, orderId);
        const orderBody = { deliveryBoy: deliveryBoy._id, orderStatus: 'Confirmed' };
        await orderService.updateOrderById(orderId, { orderBody });
    }
}

exports.ShipOrderByDeliveryBoy = async (orderId) => {
    const order = await orderService.getOrderById(orderId);
    if (order.orderStatus !== 'Confirmed') {
        throw new CustomError("Order is not yet confirmed.");
    } else {
        await orderService.updateOrderById(orderId, { orderStatus: 'Shipped' });
    }
}

exports.CancelOderByDeliveryBoy = async (orderId) => {
    const order = await orderService.getOrderById(orderId);
    let orderStatus = order.orderStatus;
    let paymentStatus = order.paymentStatus;
    let paymentPaymentStatus = '';
    if (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled') {
        throw new CustomError("Order is already delivered or cancelled.");
    } else {
        if (order.paymentMethod === 'UPI' && order.paymentStatus === 'Paid') {
            let payment = await paymentService.getPaymentById(order.paymentId);
            paymentPaymentStatus = payment.paymentStatus;
            if (payment.paymentStatus === 'Recieved') {
                const refundPayment = await paymentService.refundPayment(payment.razorpay_payment_id, payment.amount);
                if (refundPayment) {
                    paymentPaymentStatus = 'Refunded';
                    paymentStatus = 'Refunded';
                    const updatePayment = await paymentService.getPaymentByIdAndUpdate(order.paymentId, { paymentStatus: paymentPaymentStatus });
                }
            }
        }
        orderStatus = 'Cancelled';
        const orderBody = { orderStatus, paymentStatus };
        const saveOrder = await orderService.updateOrderById(orderId, orderBody);
        return saveOrder;
    }
}

exports.deliveredOrderByDeliveryBoy = async (orderId, paymentMethod) => {
    const order = await orderService.getOrderById(orderId);
    let orderBody = { orderStatus: 'Delivered' };
    if (order.paymentMethod === 'COD' && order.paymentStatus !== 'Paid') {
        // if (paymentMethod === 'UPI') {
        //     const payment = await paymentService.payForOrder(order._id, order.totalPrice);

        // }
        orderBody = { orderStatus: 'Delivered', paymentStatus: paymentMethod === 'COD' ? 'COD Received' : 'Paid' };
    }
    return await orderService.updateOrderById(orderId, orderBody);
}
