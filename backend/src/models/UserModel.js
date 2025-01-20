const mongoose = require('mongoose');

// Define the Task schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
    }]
}, {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" }, // Custom field names
});

// Create the Task model from the schema
const Users = mongoose.model('Users', userSchema);
// Users.syncIndexes();
module.exports = Users;