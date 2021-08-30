const jwt =require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
        const token = req.headers["x-access-token"];
        if (!token) {
          return res.status(403).send("A token is required for authentication");
        }
        try {
          const decoded = jwt.verify(token,process.env.secret);
          req.user = decoded;
        } catch (err) {
          return res.status(401).send("Invalid Token");
        }
        return next();
      }
      