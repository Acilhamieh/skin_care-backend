import express from 'express';
import {
  createBookingController,
  getAllBookingsController,
  getBookingsByUserIdController,
  updateBookingStatusController,
} from '../controllers/bookingsController.js';

const router = express.Router();

router.post('/', createBookingController);
router.get('/', getAllBookingsController);
router.get('/:userId', getBookingsByUserIdController);
router.put('/:id', updateBookingStatusController);

export default router;
