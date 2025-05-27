import sql from '../config/db.js';

// Create a new booking
export async function createBooking({ userId, sessionId, date }) {
  return sql`
    INSERT INTO bookings (user_id, session_id, date)
    VALUES (${userId}, ${sessionId}, ${date})
    RETURNING *;
  `;
}

// Get all bookings with user info
export async function getAllBookingsWithUserInfo() {
  return sql`
    SELECT 
      b.*, 
      u.firstName, 
      u.lastName, 
      u.email, 
      u.phone,
      s.name AS session_name,
      s.price AS session_price
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN sessions s ON b.session_id = s.id;
  `;
}

// Get bookings by user ID
export async function getBookingsByUserId(userId) {
  return sql`
     SELECT 
      b.*, 
      u.firstName, 
      u.lastName, 
      u.email, 
      u.phone,
      s.name AS session_name,
      s.price AS session_price
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN sessions s ON b.session_id = s.id
    WHERE b.user_id = ${userId};
  `;
}

// Update booking status
export async function updateBookingStatus(id, status) {
  return sql`
    UPDATE bookings
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
}
