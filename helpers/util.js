const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verifyJWT(req, res, next){
    
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token.replace('Bearer ',''), "FraseSecretaPara", function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

async function comparePassword(password, password2, cb) {
  bcrypt.compare(password, password2, function(err, isMatch) {
    if (err) return cb(err);
    cb(null,isMatch);
  });
}

module.exports = { verifyJWT, comparePassword }