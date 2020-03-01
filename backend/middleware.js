const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  // const token = 
  //     req.body.token ||
  //     req.query.token ||
  //     req.headers['x-access-token'] ||
  //     req.cookies.token;

  const token = req.headers.authorization || req.cookies.token;
  console.log(`in withAuth, token = ${token}`)
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;