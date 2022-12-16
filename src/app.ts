import express, { Application } from 'express';

const app: Application = express();
app.set('trust proxy', true);
app.use(express.json());

export { app };
