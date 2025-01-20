const mongoose = require('mongoose');

// Define the Task schema
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    faviroute: {
        type: Boolean,
        default: false
    },
    cookTime: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
    }],
    origins: {
        type: [String],
        default: []
    }
}, {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" }, // Custom field names
}) // Enables createdAt and updatedAt);

// Create the Foods model from the schema
const Foods = mongoose.model('Food', foodSchema);
Foods.syncIndexes();
module.exports = Foods;

