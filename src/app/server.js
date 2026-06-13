import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRoutes } from './models/auth/auth.routes.js';
import { sceneRoutes } from './models/scene/scene.routes.js';

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.APP_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS policy blocked origin ' + origin));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use('/api/auth', authRoutes);
app.use('/api/scene', sceneRoutes);

export default app;
