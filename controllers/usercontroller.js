import { getAllUsers, deleteUserById } from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message); // Log the error message in the server console
    res.status(500).json({
      error: 'Failed to fetch users',
      message: err.message, // Include the specific error message
    });
  }
};


// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserById(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
