// import db from '../database.js';

// Función para agregar un usuario
export const addUser = (name, email) => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  stmt.run(name, email);
  console.log(`Usuario ${name} agregado correctamente.`);
};

// Función para obtener todos los usuarios
export const getUsers = () => {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all();
};


import { addUser, getUsers } from '../models/userModel.js';

export const createUser = (req, res) => {
  const { name, email } = req.body;

  try {
    addUser(name, email);
    res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listUsers = (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};