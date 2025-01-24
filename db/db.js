import sqlite3 from 'sqlite3';
import { join } from 'path';
import fs from 'fs';

sqlite3.verbose(); // Activar modo verbose para depuración

const DB_PATH = './database.sqlite'; // Ruta original de la base de datos

//VERCEL
const DB_TEMP = '/tmp/database.sqlite'; // Ruta temporal para la base de datos

// Verificar si la base de datos existe en la ruta original
if (!fs.existsSync(DB_PATH)) {
  console.error(`La base de datos no existe en la ruta: ${DB_PATH}`);
  process.exit(1); // Finalizar la ejecución si no se encuentra la base de datos
}

// Copiar la base de datos al directorio temporal si no existe
if (!fs.existsSync(DB_TEMP)) {
  fs.copyFileSync(DB_PATH, DB_TEMP);
  console.log('Base de datos copiada al directorio temporal.');
} else {
  console.log('Base de datos ya existe en el directorio temporal.');
}

// Inicializar conexión con la base de datos desde el directorio temporal
const db = new sqlite3.Database(DB_TEMP, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos SQLite establecida.');
  }
});


// ------------------------           DESARROLLO 
// const db = new sqlite3.Database(DB_PATH)
// Opcional: Crear tablas si no existen
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
  `, (err) => {
    if (err) {
      console.error('Error creando la tabla users:', err.message);
    } else {
      console.log('Tabla "users" verificada o creada.');
    }
  });
});

export default db;
