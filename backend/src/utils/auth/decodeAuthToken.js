const jwt = require('jsonwebtoken');

// Decode the token to get the payload without verification
const decodeToken = (token) => {
    const decodedPayload = jwt.decode(token);
    console.log(decodedPayload);
}

module.exports = decodeToken;
