import express from 'express';
import multer from 'multer';
import {
  getAllSessions,
  getSessionById,
  createSession,
  deleteSession,
} from '../controllers/sessionController.js';

const upload = multer(); // Memory storage
const router = express.Router();

router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', upload.single('imageFile'), createSession);
router.delete('/:id', deleteSession);

export default router;
