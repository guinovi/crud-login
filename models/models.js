import db from "../db/db.js";

// Función para agregar un usuario
export const addUserModel = (name, email, pass) => {
  try {
    const stmt = db.prepare(
      "INSERT INTO users (user, email, pass) VALUES (?, ?, ?)"
    );
    stmt.run(name, email, pass);
    return true;
  } catch (error) {
    return false;
  }
};

// Función para obtener todos los usuarios
export const getUsersModel = () => {
  const stmt = db.prepare("SELECT id,user,role,email FROM users");
  return stmt.all();
};

export const createUserModel = (req, res) => {
  const { name, email } = req.body;

  try {
    addUser(name, email);
    res.status(201).json({ message: "Usuario creado correctamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listUserModel = (req, res) => {
  try {
    const users = getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
