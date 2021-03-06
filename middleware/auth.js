const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.auth = async (req, res, next) => {
  if (req.signedCookies) {
    //accessing token
    const token = req.signedCookies['auth'];

    try {
      //verify token
      const decoded = jwt.verify(token, 'secretKey');

      //Getting user
      const user = await User.findById(decoded.id);
      
      req.user = user;

      next();
    } catch (err) {
      res.status(401).send('unauthorized token');
    }
  } else {
    res.status(401).send('no token provide or unauthorized');
  }
};
