import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ import cors
import './config/db.js';  
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend (localhost:3000)

const allowedOrigins = [
  'http://localhost:3000',
  'https://skin-care-frontend-jhsn.vercel.app',  // ⬅️ put your deployed frontend URL here
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);
//users
app.use('/api', userRoutes);
//auth
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
