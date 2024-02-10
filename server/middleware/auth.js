const JWT = require('jsonwebtoken');
const cors = require('cors');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)

    if (!token) {
        return res.status(401).json({ error: "Please provide a valid JWT token" });
    }

    try {
        const decoded = JWT.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "JWT token has expired" });
        } else {
            return res.status(401).json({ error: "Invalid JWT token" });
        }
    }
};

// Enable CORS for all routes
const corsOptions = {
    origin: 'http://localhost:6001',
};
const corsMiddleware = cors(corsOptions);

module.exports = [corsMiddleware, verifyToken];
