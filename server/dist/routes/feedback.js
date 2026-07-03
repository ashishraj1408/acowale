import { Router } from 'express';
import { FeedbackController } from '../controllers/feedback.controller.js';
import { validateFeedback } from '../middleware/validate-request.js';
export function createFeedbackRouter() {
    const router = Router();
    const controller = new FeedbackController();
    router.post('/', validateFeedback, controller.createFeedback);
    router.get('/', controller.listFeedback);
    router.get('/analytics', controller.getAnalytics);
    return router;
}
