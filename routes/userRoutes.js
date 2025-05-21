import express from 'express';
import { getUsers,deleteUser } from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/users', getUsers); // GET all users
router.delete('/users/:id', deleteUser); // DELETE user by ID

export default router;
