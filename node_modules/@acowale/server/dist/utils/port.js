export async function findAvailablePort(startPort) {
    const net = await import('node:net');
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                resolve(findAvailablePort(startPort + 1));
                return;
            }
            reject(error);
        });
        server.listen(startPort, '127.0.0.1', () => {
            const address = server.address();
            const port = typeof address === 'object' && address ? address.port : startPort;
            server.close(() => resolve(port));
        });
    });
}
