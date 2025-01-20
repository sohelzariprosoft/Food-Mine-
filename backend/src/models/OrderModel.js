const mongoose = require('mongoose');
const Foods = require('./FoodModel');
const Users = require('./UserModel');
const CustomError = require('../utils/errors/CustomError')

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    foodItemsData: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food', // Reference to the Food model
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        foodItemPrice: {
            type: Number,
            default: 0
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'COD Received', 'Refunded'],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI'],
        default: 'COD',
        required: true,
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    postalCode: {
        type: String,
        required: true
    },
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryBoy'
    }
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" }, })

orderSchema.pre('save', async function (next) {
    let totalOrderPrice = 0;
    for (let item of this.foodItemsData) {
        const food = await Foods.findById(item.food);
        if (!food) {
            return next(new CustomError(`Food item with ID ${item.food} not found`, 400));
        }
        item.foodItemPrice = food.price * item.quantity; // Calculation happens here
        totalOrderPrice = totalOrderPrice + item.foodItemPrice; // Accumulate total order price
    }
    this.totalPrice = totalOrderPrice;
    // Add the order to the user's orders array
    const user = await Users.findOne({ email: this.email });
    if (!user) {
        return next(new CustomError(`User with email ${this.email} not found`, 400));
    }
    console.log(user);
    user.orders.push(this._id);
    await user.save();
    next();
});

const Orders = mongoose.model('Order', orderSchema);
Orders.syncIndexes();
module.exports = Orders;