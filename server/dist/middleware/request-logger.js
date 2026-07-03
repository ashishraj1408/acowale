export function requestLogger(req, _res, next) {
    console.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
}
