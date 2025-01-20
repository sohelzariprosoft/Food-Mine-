const mongoose = require('mongoose');

// Define the Task schema
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        required: true,
    }
}, {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" }, // Custom field names
});

// Create the Task model from the schema
const Tags = mongoose.model('Tags', tagSchema);
Tags.syncIndexes();
module.exports = Tags;