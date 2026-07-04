import { Router } from 'express';
import { createFeedback, getFeedback } from '../controllers/feedback.controller.js';

const router = Router();

router.get('/', getFeedback);
router.post('/', createFeedback);

export default router;
