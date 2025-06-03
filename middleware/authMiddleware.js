const jwt = require('jsonwebtoken');
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

module.exports = auth;
module.exports.authorizeRoles = authorizeRoles;
