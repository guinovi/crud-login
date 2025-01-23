import { DatabaseSync } from "node:sqlite";
import { openSync } from "node:fs";

const DB_PATH = "./database.sqlite"; // Ruta de tu archivo SQLite

// Verifica si el archivo de la base de datos existe o crea uno nuevo
// const dbFile = openSync(DB_PATH);

// Abre una conexión a la base de datos en modo síncrono
const db = new DatabaseSync(DB_PATH);

// Configuración inicial de la base de datos
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    pass TEXT NOT NULL,
    role TEXT NOT NULL UNIQUE,
    email text NOT NULL,
    rolBool BOOLEAN DEFAULT 0
  );
`);

console.log("Base de datos inicializada correctamente.");

export default db;
