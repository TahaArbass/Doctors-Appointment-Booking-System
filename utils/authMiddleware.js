const { verifyToken } = require('./auth');


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const data = verifyToken(token);
    req.user = data;
    next();
  } catch {
    res.sendStatus(403);
  }
}

module.exports = authMiddleware;