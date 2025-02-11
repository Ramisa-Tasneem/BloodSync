import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './database.js';


import AuthRouter from './Routes/AuthRouter.js';


const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());




app.use('/api', AuthRouter);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});