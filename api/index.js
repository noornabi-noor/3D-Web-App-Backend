import app from '../src/app/server.js';
import { connectDB } from '../src/app/db.js';

await connectDB();

export default app;
