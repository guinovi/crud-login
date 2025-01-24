import { Router } from 'express';
import { getIndex, postLogin, postNewUser, getProtected, getAdminPage, getUsers, getUserPage } from '../controllers/controllers.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

router.get('/', getIndex);
router.post('/login', postLogin);
router.post('/newUser', postNewUser)

// Rutas protegidas
router.get('/protected', authMiddleware, getProtected);
router.get('/admin', authMiddleware, getAdminPage);

// ADMIN
router.get('/getUsers', authMiddleware, getUsers);

//USER
router.get('/user', authMiddleware, getUserPage);

export default router;
