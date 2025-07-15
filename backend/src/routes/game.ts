import { Router } from 'express';
import { gameController } from '../controllers/gameController';

const router = Router();

// GET /api/game/session
router.get('/session', gameController.getCurrentSession);

// POST /api/game/start
router.post('/start', gameController.startNewGame);

// POST /api/game/choice
router.post('/choice', gameController.makeChoice);

// GET /api/game/history
router.get('/history', gameController.getGameHistory);

// GET /api/game/character
router.get('/character', gameController.getCharacter);

export default router; 