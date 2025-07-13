import { createServer } from './config/server';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

// Import routes
import authRoutes from './routes/auth';
import gameRoutes from './routes/game';
import storyRoutes from './routes/story';
import userRoutes from './routes/user';

const app = createServer();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app; 