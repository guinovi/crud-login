import db from "../db/db.js";

export const getUserModel = (user, callback) => {
  db.get(`SELECT * FROM users WHERE user = ?`, [user], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, row);
  });
};


export const getUserEmailModel = (user, email, callback) => {
  db.get(`SELECT * FROM users WHERE user = ? OR email = ?`, [user, email], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, row);
  });
};


export const addNewUserModel = (user, email, contraseña, callback) => {
  db.run("INSERT INTO users (user, email, pass) VALUES (?, ?, ?)", [user, email, contraseña], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  })
}



// Función para obtener todos los usuarios
export const getUsersModel = (callback) => {
  db.all("SELECT id,user,role,email FROM users where rolBool = 0",(err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
  })
};




