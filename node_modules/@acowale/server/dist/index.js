import { createApp } from './app.js';
import { config } from './config/env.js';
import { findAvailablePort } from './utils/port.js';
const app = createApp();
async function startServer() {
    const port = await findAvailablePort(config.port);
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}
void startServer();
