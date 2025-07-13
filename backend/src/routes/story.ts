import { Router } from 'express';
import { storyController } from '../controllers/storyController';

const router = Router();

// GET /api/story/node/:id
router.get('/node/:id', storyController.getStoryNode);

// GET /api/story/nodes
router.get('/nodes', storyController.getAllNodes);

// POST /api/story/generate
router.post('/generate', storyController.generateStoryContent);

export default router; 