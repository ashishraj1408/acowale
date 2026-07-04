import { Router } from 'express';
import feedbackRoutes from './feedback.routes.js';
import analyticsRoutes from './analytics.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/feedback', feedbackRoutes);
router.use('/feedback/analytics', analyticsRoutes);
router.use('/health', healthRoutes);

export default router;
