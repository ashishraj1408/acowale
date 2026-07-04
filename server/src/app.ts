import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import requestLogger from './middleware/request-logger.js';
import validateRequest from './middleware/validate-request.js';
import rateLimit from './middleware/rate-limit.js';
import errorHandler from './middleware/error-handler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimit);
app.use(validateRequest);

app.use('/api', routes);
app.use(errorHandler);

export default app;
