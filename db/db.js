import sqlite3 from 'sqlite3';
sqlite3.verbose(); // Configurar verbose directamente

const DB_PATH = './database.sqlite';
const db = new sqlite3.Database(DB_PATH);

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
      return console.error('Error creando la tabla users:', err.message);
    }
    console.log('Db Inicializado');
  });
});

/* db.close((err) => {
  if (err) {
    return console.error('Error cerrando la base de datos:', err.message);
  }
  console.log('Base de datos cerrada correctamente.');
});
 */
export default db;
