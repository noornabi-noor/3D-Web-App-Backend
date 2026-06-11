import 'dotenv/config';
import express from 'express';
import { connectDB } from './db.js';
import { authRoutes } from './models/auth/auth.routes.js';

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running");
});