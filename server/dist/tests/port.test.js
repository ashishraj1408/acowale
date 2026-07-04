import { createServer } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { findAvailablePort } from '../utils/port.js';
const servers = [];
afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))));
});
describe('findAvailablePort', () => {
    it('returns a free port when the requested one is occupied', async () => {
        const occupiedServer = createServer();
        await new Promise((resolve, reject) => occupiedServer.listen(0, '127.0.0.1', () => resolve()));
        servers.push(occupiedServer);
        const port = await findAvailablePort(occupiedServer.address().port);
        expect(port).toBeGreaterThan(0);
        expect(port).not.toBe(occupiedServer.address().port);
    });
});
