import { randomUUID } from 'node:crypto';
export function requestIdMiddleware(req, res, next) {
    const requestId = req.get('x-request-id') ?? randomUUID();
    res.setHeader('x-request-id', requestId);
    req.headers['x-request-id'] = requestId;
    next();
}
