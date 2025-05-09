import postgres from 'postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL); // just to confirm it loads

// Create sql instance
const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

// Test connection
sql`SELECT 1`.then(() => {
  console.log('✅ Connected to Supabase!');
}).catch(err => {
  console.error('❌ Connection error:', err);
});

export default sql;
