const Orders = require('../models/OrderModel'); // Mongoose model
const { CustomError } = require('../utils/errors/CustomError')
const PhoneNumberValidate = require('../utils/validations/PhoneNumberValidate');
const SMSService = require('../utils/messaging/SMSMessage')
const MapLinkGenerator = require('../utils/messaging/GenerateMapLink')
const paymentService = require('./PaymentService');

exports.getAllOrders = async () => {
    return await Orders.find().populate('foodItemsData.food');
}
exports.getOrdersByEmail = async (email) => {
    return await Orders.find({ email })
}
exports.createOrder = async (orderData) => {
    const { foodItemsData, address, lat, lng, phoneNo, email, paymentMethod, postalCode } = orderData;
    let googleMapLink = ''
    if (!PhoneNumberValidate(phoneNo)) {
        throw new CustomError("Invaild phone number.", 400);
    }
    if (lat && lng && lat !== '' && lng !== '') {
        googleMapLink = MapLinkGenerator(lat, lng);
    }
    const newOrder = new Orders({ foodItemsData, address, lat, lng, phoneNo, email, paymentMethod, postalCode });
    const newDbOrder = await (await newOrder.save()).populate('foodItemsData.food')
    console.log(newDbOrder);
    if (newDbOrder) {
        if (newDbOrder.paymentMethod === 'COD') {
            SMSService(`Your order placed successfully \n
                Order Status :- ${newDbOrder.orderStatus}. \n
                Total Amount :- ${newDbOrder.totalPrice}. \n
                Payment Status :- ${newDbOrder.paymentStatus === 'Paid' ? 'Paid' : 'Cash On Delivery'}. \n
                Address:- ${newDbOrder.address}. \n            
                Please check your order recieving address : \n
                 ${googleMapLink}`, phoneNo);
        }
        return newDbOrder;
    }
    throw new CustomError("Some error occured during placing order.", 500);
}

exports.getOrderById = async (orderId) => {
    return await Orders.findById(orderId).populate('foodItemsData.food');
}

exports.changeOrderPaymentStatusById = async (orderId, status = 'Pending') => {
    const order = await Orders.findByIdAndUpdate(orderId, { paymentStatus: status }, { new: true });
    if (!order) {
        throw new CustomError("Order not found", 404);
    }
    return order;
}

exports.changeOrderStatusByIdFromDeliveryBoy = async (orderId, status = 'Pending') => {
    const order = await Orders.findById(orderId);
    if (!order) {
        throw new CustomError("Order not found", 404);
    }
    if (order.paymentStatus !== 'Paid') {
        order.paymentStatus = status;
    }
    order.orderStatus = 'Delivered';
    return await order.save();
}

exports.updateOrderById = async (orderId, orderBody) => {
    const updatedOrder = await Orders.findByIdAndUpdate(orderId, orderBody, { new: true })
    console.log(updatedOrder);
    return updatedOrder;
}

exports.cancelOrderById = async (orderId) => {
    let order = await this.getOrderById(orderId);
    let orderStatus = order.orderStatus;
    let paymentStatus = order.paymentStatus;
    let paymentPaymentStatus = '';

    if (order.orderStatus === 'Processing' || order.orderStatus === 'Confirmed') {
        if (order.paymentMethod === 'UPI' && order.paymentStatus === 'Paid') {
            let payment = await paymentService.getPaymentById(order.paymentId);
            console.log('payment', payment);
            paymentPaymentStatus = payment.paymentStatus;
            if (payment.paymentStatus === 'Recieved') {
                const refundPayment = await paymentService.refundPayment(payment.razorpay_payment_id, payment.amount);
                console.log('refundPayment', refundPayment);
                if (refundPayment) {
                    paymentPaymentStatus = 'Refunded';
                    paymentStatus = 'Refunded';
                    const updatePayment = await paymentService.getPaymentByIdAndUpdate(order.paymentId, { paymentStatus: paymentPaymentStatus });
                    console.log('updatePayment', updatePayment);
                }
            }
        }
        orderStatus = 'Cancelled';
        const orderBody = { orderStatus, paymentStatus };
        const saveOrder = await this.updateOrderById(orderId, orderBody);
        return saveOrder;
    }
    else {
        return order;
    }
}

exports.getOrderDeliveryBoy = async (orderId) => {
    const orderDeliveryBoy = await Orders.findById(orderId).populate('deliveryBoy');
    return orderDeliveryBoy;
}

