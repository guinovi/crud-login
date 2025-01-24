import express from "express";
import path from "path";
import { fileURLToPath } from "node:url";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { getUserModel, getUserEmailModel,addNewUserModel, getUsersModel } from "../models/models.js";

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

  getUserModel(user, (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al buscar el usuario");
    }

    if (!row) {
      return res.status(404).send("Usuario no encontrado");
    }

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
  });
};

//NEW USERS
const postNewUser = (req, res) => {
  const data = req.body;
  getUserEmailModel(data.newUser, data.newMail, (err, row)=>{
    if(err){
      console.error(err);
      return res.status(500).send("Error al buscar el usuario o email");
    }
    if(row){
      return res.status(409).send("El usuario o email ya existe");
    }
    if(!row){
      bcrypt.hash(data.newPass, 10, function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(404).send("Error Al crear la contraseña");
        }
        data.newPass = hash;
        addNewUserModel(data.newUser, data.newMail,data.newPass, (err, result)=>{
          if(err){
            console.error(err);
            return res.status(500).send("Error al insertar el usuario");
          }
          console.log(result);
          return res.status(200).send("Usuario creado correctamente");
        })
      });

    }
  })
};

const getProtected = (req, res) => {
  const { username, role } = req.user; // Datos del token decodificado
  if (role === "Administrador") {
    res.json({ redirect: "/admin" });
  }
  if (role === "user") {
    res.json({ redirect: "/user" });
  }
};

// ADMIN
const getAdminPage = (req, res) => {
  const { role } = req.user;

  if (role !== "Administrador") {
    return res.status(403).send("Acceso denegado");
  }

  res.sendFile(path.join(__dirname, "..", "public", "pages", "admin.html"));
};

const getUsers = (req, res) => {
  const { role } = req.user;
  if (role !== "Administrador") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  getUsersModel((err, users) => {
    if (err || !users) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    res.json(users);
  })
};




// USER
const getUserPage = (req, res) => {
  const { role } = req.user;
  if (role !== "user") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  res.sendFile(path.join(__dirname, "..", "public", "pages", "user.html"));
};

export {
  getIndex,
  postLogin,
  postNewUser,
  getProtected,
  getAdminPage,
  getUsers,
  getUserPage,
};
