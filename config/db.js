import postgres from 'postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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
