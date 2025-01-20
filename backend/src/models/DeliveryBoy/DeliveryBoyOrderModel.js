const mongoose = require('mongoose');

const deliveryBoyOrderSchema = new mongoose.Schema({
    deliveryBoyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryBoy',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });

const DeliveryBoyOrders = mongoose.model('DeliveryBoyOrders', deliveryBoyOrderSchema);
DeliveryBoyOrders.syncIndexes();
module.exports = DeliveryBoyOrders;
