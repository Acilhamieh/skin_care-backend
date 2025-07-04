import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// REGISTER
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, age, phone, role = 'user' } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      phone,
      role
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Send token in response body instead of cookie
    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// LOGOUT (optional for localStorage-based auth)
export const logoutUser = (req, res) => {
  res.json({ message: 'Logout handled on frontend by clearing localStorage' });
};
