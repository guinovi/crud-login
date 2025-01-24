import sqlite3 from 'sqlite3';

// Crear una base de datos en memoria
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos en memoria establecida.');
  }
});

// Crear la tabla de usuarios
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL UNIQUE,
      pass TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      email TEXT NOT NULL UNIQUE,
      rolBool BOOLEAN DEFAULT 0
    );
  `);
});

// Insertar un usuario con valores de las variables de entorno
const insertUser = () => {
  const { user, pass, role, email, rolBool } = process.env;

  const stmt = db.prepare(`
    INSERT INTO users (user, pass, role, email, rolBool)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(user, pass, role, email, rolBool, function (err) {
    if (err) {
      console.error('Error al insertar usuario:', err.message);
    } else {
      console.log(`Usuario insertado con ID: ${this.lastID}`);
    }
  });

  stmt.finalize();
};

// Llamamos a la función para insertar el usuario
insertUser();

export default db;
