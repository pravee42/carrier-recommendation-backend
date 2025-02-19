const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const t2 = req.header("Authorization");
    let token = t2.split("Bearer ")[1]
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token, "s2e");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticate;
