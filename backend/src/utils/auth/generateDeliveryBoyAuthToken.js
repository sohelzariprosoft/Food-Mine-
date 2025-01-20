const jwt = require('jsonwebtoken');
exports.generateDeliveryBoyAuthToken = (user) => {

    const options = {
        expiresIn: "10d", // Token expiration time (e.g., 1 day)
    };

    // Generate the token
    return jwt.sign(user, process.env.JWT_SECRET, options);
};