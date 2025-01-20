const mongoose = require('mongoose');

// Define the Task schema
const errorSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'fail'
    },
    message: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" }, // Custom field names
});

// Create the Task model from the schema
const ErrorLogs = mongoose.model('Errors', errorSchema);

module.exports = ErrorLogs;