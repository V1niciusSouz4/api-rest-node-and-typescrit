import express, { json } from 'express';
import { router } from './routes/index';
import 'dotenv/config';

const server = express();

server.use(json());
server.use(router);

export { server };