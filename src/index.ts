import express from 'express';
import http from 'http';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true
}));


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);


mongoose.Promise = Promise;
const mongodb_url: any = process.env.mongodb_url;

app.use(errorHandler)

mongoose.connect(mongodb_url)
mongoose.connection.on('error', (error: Error) => console.log(error.message));

server.listen(process.env.PORT, ()=>{ console.log(`server running on port ${process.env.PORT}`)});
