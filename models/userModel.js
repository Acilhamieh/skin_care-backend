import sql from '../config/db.js';

// Get all users
export const getAllUsers = async () => {
  return await sql`SELECT * FROM users ORDER BY "createdAt" DESC;`;
};

// Delete user by ID
export const deleteUserById = async (id) => {
  return await sql`DELETE FROM users WHERE id = ${id}`;
};
 
//find by email
export const findUserByEmail = async (email) => {
  const users = await sql`SELECT * FROM users WHERE "email" = ${email}`;
  return users[0];
};
//create user
export const createUser = async ({ firstName, lastName, email, password, age, phone, role }) => {
  const [user] = await sql`
    INSERT INTO users ("firstName", "lastName", "email", "password", "age", "phone", "role")
    VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${age}, ${phone}, ${role})
    RETURNING "id", "firstName", "lastName", "email", "age", "phone", "role", "createdAt"
  `;
  return user;
};

