import { createServer } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { findAvailablePort } from '../utils/port.js';

const servers: ReturnType<typeof createServer>[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))));
});

describe('findAvailablePort', () => {
  it('returns a free port when the requested one is occupied on the app host', async () => {
    const occupiedServer = createServer();
    await new Promise<void>((resolve, reject) => occupiedServer.listen(0, '0.0.0.0', () => resolve()));
    servers.push(occupiedServer);

    const port = await findAvailablePort((occupiedServer.address() as { port: number }).port);

    expect(port).toBeGreaterThan(0);
    expect(port).not.toBe((occupiedServer.address() as { port: number }).port);
  });

  it('avoids ports occupied on the wildcard host used by the app', async () => {
    const occupiedServer = createServer();
    await new Promise<void>((resolve, reject) => occupiedServer.listen(0, '0.0.0.0', () => resolve()));
    servers.push(occupiedServer);

    const port = await findAvailablePort((occupiedServer.address() as { port: number }).port);

    expect(port).toBeGreaterThan(0);
    expect(port).not.toBe((occupiedServer.address() as { port: number }).port);
  });
});
