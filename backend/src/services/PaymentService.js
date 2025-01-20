const razorPayConstant = require('../configs/PaymentsConfig');
const Payments = require('../models/PaymentModel');
const orderService = require('./OrderService');
const { CustomError } = require('../utils/errors/CustomError');
const SMSService = require('../utils/messaging/SMSMessage')
const crypto = require('crypto');
const MapLinkGenerator = require('../utils/messaging/GenerateMapLink')

exports.payForOrder = async (amount) => {
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: `FoodMine_receipt_${Date.now()}`,
    };
    const paymentOrder = await razorPayConstant.orders.create(options);
    return paymentOrder;
}

exports.verifyPayment = async (paymentData, orderID) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = paymentData;

    const hmac = crypto.createHmac('sha256', '00LXswCa9gcIsVrEKHCexHyw');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        const payment = new Payments({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount
        });
        const savedPayment = await payment.save();
        //For payments link with order
        const order = await orderService.updateOrderById(orderID, { paymentId: savedPayment._id, paymentStatus: 'Paid' });
        //For sending SMS
        if (order.lat && order.lng && order.lat !== '' && order.lng !== '') {
            googleMapLink = MapLinkGenerator(order.lat, order.lng);
        }
        if (order.paymentMethod === 'UPI') {
            SMSService(`Your order placed successfully \n
                Order Status :- ${order.orderStatus}. \n
                Total Amount :- ${order.totalPrice}. \n
                Payment Status :- ${order.paymentStatus === 'Paid' ? 'Paid' : 'Cash On Delivery'}. \n
                Address:- ${order.address}. \n            
                Please check your order recieving address : \n
                 ${googleMapLink}`, order.phoneNo);
        }
        return generatedSignature;
    } else {
        throw new CustomError('Payment failed due to signature', 400);
    }
}

exports.refundPayment = async (razorPayPaymentID, amount) => {
    console.log('refund', razorPayPaymentID, amount);
    const refund = await razorPayConstant.payments.refund(razorPayPaymentID, {
        amount
    });
    return refund;
}

exports.getPaymentById = async (paymentID) => {
    const payment = await Payments.findById(paymentID);
    return payment;
}

exports.getPaymentByIdAndUpdate = async (paymentID, updateData) => {
    const updatedPayment = await Payments.findByIdAndUpdate(paymentID, updateData, { new: true });
    return updatedPayment;
}

exports.getAllPayments = async () => {
    return await Payments.find();
}