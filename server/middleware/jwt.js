const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    return res.status(403).send({ error: 'No token provided!' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }
    req.body._id = decoded._id;
    req.body.role = decoded.role;
    req.body.userType = decoded.userType;
    req.body._orgId = decoded._orgId;
    next();
  });
};
module.exports = verifyToken;