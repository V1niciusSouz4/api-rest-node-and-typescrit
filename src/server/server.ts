import express, { json } from 'express';
import { router } from './routes/index';
import 'dotenv/config';

import './shared/services/translationYup';

const server = express();

server.use(json());
server.use(router);

export { server };