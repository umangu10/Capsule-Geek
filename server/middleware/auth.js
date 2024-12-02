const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Use the same secret as in server.js

module.exports = function(req, res, next) {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if decoded has an id
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 