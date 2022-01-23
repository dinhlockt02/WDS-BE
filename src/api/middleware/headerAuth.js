module.exports.authentication = function(req, res, next) {
var headerAuth = req.headers.authorization;

if (headerAuth) {
 var token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  }
};
