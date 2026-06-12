import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { authRoutes } from './models/auth/auth.routes.js';
import { sceneRoutes } from './models/scene/scene.routes.js';

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/scene", sceneRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});