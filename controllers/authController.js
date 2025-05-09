/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';

// Register
export const register = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    phone,
    role // optional, default is 'user'
  } = req.body;

  // Check if user already exists
  findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (result.length) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Build user object
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age: age || null,
      phone: phone || null,
      role: role || 'user'
    };

    // Insert into database
    createUser(newUser, (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login
export const login = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  findUserByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (!result.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];

    // Compare passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  });
};*/
