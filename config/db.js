import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const db = new Pool({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
});

db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL (Supabase) Database!'))
  .catch((err) => console.error('❌ Connection error:', err.stack));

export default db;
