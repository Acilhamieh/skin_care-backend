import express from 'express';
import dotenv from 'dotenv';
//import authRoutes from './routes/authRoutes.js';
import './config/db.js';  // or the correct path to your db file
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
const app = express();


app.use(express.json());

// Routes
//app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
