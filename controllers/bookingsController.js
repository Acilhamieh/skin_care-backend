import {
  createBooking,
  getAllBookingsWithUserInfo,
  getBookingsByUserId,
  updateBookingStatus,
} from '../models/bookingsModel.js';

// Create booking
export const createBookingController = async (req, res) => {
  try {
    const { userId, sessionId, date } = req.body;
    const result = await createBooking({ userId, sessionId, date });
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking', details: err.message });
  }
};

// Get all bookings with user info
export const getAllBookingsController = async (_req, res) => {
  try {
    const result = await getAllBookingsWithUserInfo();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get bookings', details: err.message });
  }
};

// Get bookings by user ID
export const getBookingsByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getBookingsByUserId(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user bookings', details: err.message });
  }
};

// Update booking status
export const updateBookingStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateBookingStatus(id, status);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking status', details: err.message });
  }
};
