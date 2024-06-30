const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Access Denied" });

    const token = authHeader.replace('Bearer ', '');
    console.log("Extracted token:", token);

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified token payload:", verified);
        req.user = verified;
        next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        res.status(400).json({ message: "Invalid Token" });
    }
}