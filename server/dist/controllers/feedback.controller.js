import { FeedbackService } from '../services/feedback.service.js';
export class FeedbackController {
    feedbackService;
    constructor(feedbackService = new FeedbackService()) {
        this.feedbackService = feedbackService;
    }
    createFeedback = async (req, res, next) => {
        try {
            const feedback = await this.feedbackService.createFeedback(req.body);
            res.status(201).json(feedback);
        }
        catch (error) {
            next(error);
        }
    };
    listFeedback = async (req, res, next) => {
        try {
            const feedback = await this.feedbackService.listFeedback({
                category: req.query.category,
                search: req.query.search,
            });
            res.status(200).json(feedback);
        }
        catch (error) {
            next(error);
        }
    };
    getAnalytics = async (_req, res, next) => {
        try {
            const analytics = await this.feedbackService.getAnalytics();
            res.status(200).json(analytics);
        }
        catch (error) {
            next(error);
        }
    };
}
