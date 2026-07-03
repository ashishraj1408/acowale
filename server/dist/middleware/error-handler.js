import { AppError } from '../utils/app-error.js';
export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }
    console.error('[Unhandled Error]', err);
    return res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
};
