import db from '../config/db.js';

export const findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

export const createUser = (user, callback) => {
  const query = `
    INSERT INTO users 
    (firstName, lastName, email, password, age, phone, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.age,
    user.phone,
    user.role
  ];

  db.query(query, values, callback);
};

