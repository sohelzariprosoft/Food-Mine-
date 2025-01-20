const jwt = require('jsonwebtoken');
exports.generateAuthToken = (user) => {
    const payload = {
        id: user.id,         // Include user ID
        email: user.email,   // Include user email or other relevant data
        isAdmin: user.isAdmin
    };

    const options = {
        expiresIn: "10d", // Token expiration time (e.g., 1 day)
    };

    // Generate the token
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};
