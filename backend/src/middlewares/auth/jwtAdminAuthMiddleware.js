const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log(req.headers.authorization?.split(" ")[1]);
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(403).json({ message: "Provided token is wrong" })
        }
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: "You dont have permission to this action." })
        }
        req.user = decoded; // Attach decoded token data to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};
module.exports = verifyToken;