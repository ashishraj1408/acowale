import { Router } from 'express';
import { config } from '../config/env.js';
export function createInfoRouter() {
    const router = Router();
    router.get('/', (_req, res) => {
        res.json({
            environment: config.nodeEnv,
            port: config.port,
            databaseConfigured: Boolean(config.databaseUrl),
        });
    });
    return router;
}
