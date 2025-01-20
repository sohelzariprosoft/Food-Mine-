const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/, // Phone number validation (10 digits)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    workAreaPostalCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Duty', 'Off Duty'],
        default: 'Inactive',
    },
    isDeliveryBoy: {
        type: Boolean,
        default: true,
    },
    deliveryHistory: [{
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }
    }],
    isAuthenticated: {
        type: Boolean,
        default: true
    }
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });

const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);
DeliveryBoy.syncIndexes();
module.exports = DeliveryBoy;
