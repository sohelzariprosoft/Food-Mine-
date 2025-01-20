const paymentService = require('../services/PaymentService');
const orderService = require('../services/OrderService');
const CustomError = require('../utils/errors/CustomError');

exports.payForOrder = async (req, res) => {
    const { orderId } = req.body;
    const order = await orderService.getOrderById(orderId);
    const payment = await paymentService.payForOrder(order.totalPrice);
    if (payment) {
        return res.status(200).json({ success: true, payment, order });
    } else {
        throw new CustomError('Paymentsss Failed', 500);
    }
}

exports.verifyPayment = async (req, res) => {
    const paymentData = req.body;
    const orderID = req.params.orderID;
    const signature = await paymentService.verifyPayment(paymentData, orderID);
    return res.status(200).json({ success: true, signature });
}

exports.getAllPayments = async (req, res) => {
    const payments = await paymentService.getAllPayments();
    return res.status(200).json({ success: true, payments });
}

exports.refundPayment = async (req, res) => {

}
