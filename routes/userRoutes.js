import express from 'express';
import { getUsers, deleteUser } from '../controllers/usercontroller.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET all users (Admin only)
router.get('/users', isAuthenticated, isAdmin, getUsers);

// DELETE user by ID (Admin only)
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

export default router;
