const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ['Recieved', 'Refunded'], default: 'Recieved' }
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });

const Payments = mongoose.model('Payment', paymentSchema);
Payments.syncIndexes();
module.exports = Payments;