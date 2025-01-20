const verifyPaymentSignature = async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', 'YOUR_KEY_SECRET')
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ message: 'Payment verified successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid payment signature!' });
    }
}