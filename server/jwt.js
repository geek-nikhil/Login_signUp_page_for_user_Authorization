const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const jwtmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Access denied. No token provided');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Access denied. Invalid token');
    }
};

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtmiddleware, generateToken };
