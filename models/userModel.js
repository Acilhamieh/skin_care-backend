import sql from '../config/db.js';

export const findUserByEmail = async (email) => {
  const users = await sql`SELECT * FROM users WHERE email = ${email}`;
  return users[0];
};

export const createUser = async (first_name, last_name, email, hashedPassword, age, phone) => {
  const newUser = await sql`
    INSERT INTO users (first_name, last_name, email, password, age, phone)
    VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${age}, ${phone})
    RETURNING id, first_name, last_name, email, role, created_at
  `;
  return newUser[0];
};
