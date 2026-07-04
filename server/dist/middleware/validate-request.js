import { z } from 'zod';
import { AppError } from '../utils/app-error.js';
const feedbackSchema = z.object({
    category: z.enum(['BUG', 'FEATURE', 'IMPROVEMENT', 'GENERAL'], {
        errorMap: () => ({ message: 'Category is required' }),
    }),
    comment: z.string().trim().min(10, 'Comment must be at least 10 characters long').max(1000, 'Comment must be at most 1000 characters long'),
});
export function validateFeedback(req, _res, next) {
    const result = feedbackSchema.safeParse(req.body);
    if (!result.success) {
        const message = result.error.issues[0]?.message ?? 'Validation failed';
        return next(new AppError(400, message));
    }
    req.body = result.data;
    next();
}
