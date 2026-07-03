import { describe, expect, it } from 'vitest';
import { FeedbackService } from '../services/feedback.service.js';
describe('FeedbackService', () => {
    it('rejects empty comments', async () => {
        const service = new FeedbackService();
        await expect(service.createFeedback({ category: 'GENERAL', comment: '   ' })).rejects.toThrow('Comment is required');
    });
    it('rejects short comments', async () => {
        const service = new FeedbackService();
        await expect(service.createFeedback({ category: 'GENERAL', comment: 'short' })).rejects.toThrow('Comment must be at least 10 characters long');
    });
});
