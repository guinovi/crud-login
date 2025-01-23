import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.cook; // Accede a la cookie "cook"
  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Token faltante.' });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'No autorizado. Token inválido o expirado.' });
    }

    req.user = decoded;
    next(); 
  });
};

export default authMiddleware;
