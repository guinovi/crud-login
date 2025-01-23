import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


const getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "pages", "index.html"));
};

const postLogin = (req, res) => {
  const { user, pass } = req.body;
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE user =?");
    const row = stmt.get(user);
    if (row) {
      //HASS BCRYPT
      bcrypt.compare(pass, row.pass, function (err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send("usuario o contraseña incorrecto");
        }
        if (result) {
          const token = jwt.sign(
            { username: row.user, role: row.role },
            process.env.SECRETKEY,
            {
              expiresIn: "1h",
            }
          );
          return res
            .cookie("cook", token, {
              httpOnly: true, // Solo accesible por el servidor
              secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
              sameSite: "strict", // Para evitar problemas de CSRF
            })
            .send({ user, token });
        } else {
          return res.status(500).send("usuario o contraseña incorrecto");
        }
      });
    } else {
      console.error("error");
      return res.status(500).send("Error al iniciar sesion");
    }
  } catch (err) {
    return console.error(err);
  }
};

/* const getProtected = (req, res) => {
  const token = req.cookies.cook; // Accede a la cookie "cook"
  if (!token) {
    return res.status(401).send("No autorizado");
  }
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Sin Autorización");
    } else {
      // Acceso permitido
      console.log(decoded);
      if (decoded.role === "Administrador") {
        return res.json({ redirect: '/admin' });
      }
    }
  });
};

const getAdmin = (req, res) => {
  const token = req.cookies.cook; // Accede a la cookie "cook"
  if (!token) {
    return res.status(401).send("No autorizado");
  }
  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Sin Autorización");
    }
  })
  res.sendFile(path.join(__dirname, "..", "public", "pages", "admin.html"));
}; */

const getProtected = (req, res) => {
  console.log(req.user)
  const { username, role } = req.user; // Datos del token decodificado
  if(role === 'Administrador'){

    res.json({ user:username, redirect: '/admin' });
  }
};

const getAdmin = (req, res) => {
  const { role } = req.user;

  if (role !== 'Administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Solo para administradores.' });
  }

  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'admin.html'))

};

export { getIndex, postLogin, getProtected, getAdmin };
