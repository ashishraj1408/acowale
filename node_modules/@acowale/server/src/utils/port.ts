export async function findAvailablePort(startPort: number) {
  const net = await import('node:net');

  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    const host = '0.0.0.0';

    server.unref();
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
        resolve(findAvailablePort(startPort + 1));
        return;
      }

      reject(error);
    });

    server.listen(startPort, host, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : startPort;
      server.close(() => resolve(port));
    });
  });
}
