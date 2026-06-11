const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fvjhuf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  if (db) return db; // prevent multiple connections

  await client.connect();
  console.log("MongoDB Connected");

  db = client.db(process.env.DB_NAME);
  return db;
}

module.exports = connectDB;