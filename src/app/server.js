require('dotenv').config();

const express = require('express');
const connectDB = require('./db');

const app = express();
app.use(express.json());

let usersCollection;

async function startServer() {
  const db = await connectDB();

  // Routes
  app.get('/', async (req, res) => {
    try {
      // Ping the database to confirm it's connected and responding
      await db.admin().ping();
      res.json({
        status: "Success",
        database: "Connected",
        message: "MongoDB connection is active!"
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        database: "Disconnected",
        message: `Failed to ping database: ${error.message}`
      });
    }
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);