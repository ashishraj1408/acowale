import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { requestLogger } from './middleware/request-logger.js';
import { createHealthRouter } from './routes/health.js';
import { createInfoRouter } from './routes/info.js';
import { createFeedbackRouter } from './routes/feedback.js';
export function createApp() {
    const app = express();
    app.set('trust proxy', 1);
    app.use(helmet());
    app.use(cors({
        origin: true,
        credentials: true,
    }));
    app.use(compression());
    app.use(express.json({ limit: '1mb' }));
    app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
    app.use(requestIdMiddleware);
    app.use(requestLogger);
    app.get('/', (_req, res) => {
        res.status(200).json({
            service: 'Acowale Assessment API',
            status: 'ok',
            version: '1.0.0',
            environment: config.nodeEnv,
        });
    });
    app.use('/api/health', createHealthRouter());
    app.use('/api/info', createInfoRouter());
    app.use('/api/feedback', createFeedbackRouter());
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            error: 'Route not found',
        });
    });
    app.use(errorHandler);
    return app;
}
export const app = createApp();
