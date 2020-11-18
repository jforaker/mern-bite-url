import { MongoClient } from "mongodb";

const { NODE_ENV, DB_USER, DB_PASS, DB_NAME = "mb-url" } = process.env;

let DB_URL;

[DB_USER, DB_PASS].forEach((value) => {
  if (!value) {
    throw new Error(
      "Please define the DB_USER, DB_PASS environment variables inside .env"
    );
  }
});

if (NODE_ENV === "production") {
  DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.fpl2s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
} else {
  DB_URL = "mongodb://localhost:27017";
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cached = global.mongo;
if (!cached) {
  cached = global.mongo = {};
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const conn = {};
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(DB_URL, opts)
      .then((client) => {
        conn.client = client;
        return client.db(DB_NAME);
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
}
