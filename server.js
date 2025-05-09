import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import './config/db.js';  
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
