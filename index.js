import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import router from './routes/routes.js'
import dotenv from 'dotenv';
import db from './db/db.js'
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());


dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',router);

const PORT = process.env.PORT ?? 3000

app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})