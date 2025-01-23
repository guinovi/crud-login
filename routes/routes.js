import { Router } from 'express';
import { getIndex, postLogin, getProtected, getAdmin } from '../controllers/controllers.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

router.get('/', getIndex);
router.post('/login', postLogin);

// Rutas protegidas
router.get('/protected', authMiddleware, getProtected);
router.get('/admin', authMiddleware, getAdmin);

export default router;
