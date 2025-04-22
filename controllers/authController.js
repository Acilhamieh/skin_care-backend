import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/userModel.js';

// Register
export const register = (req, res) => {
  const { id, firstName, lastName, email, password, role } = req.body;

  findUserByEmail(email, (err, result) => {
    if (result.length) return res.status(400).json({ message: 'User already exists!' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id, firstName, lastName, email, password: hashedPassword, role };

    createUser(newUser, (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login
export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, result) => {
    if (!result.length) return res.status(404).json({ message: 'User not found' });

    const validPassword = bcrypt.compareSync(password, result[0].password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: result[0].id, role: result[0].role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Login successful', token });
  });
};
