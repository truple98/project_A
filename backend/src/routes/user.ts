import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// GET /api/user/profile
router.get('/profile', userController.getProfile);

// PUT /api/user/profile
router.put('/profile', userController.updateProfile);

// DELETE /api/user/account
router.delete('/account', userController.deleteAccount);

export default router; 