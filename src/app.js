import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "16kb"})) // we don't want much jason request at a time only limited other wise server gonna crash.
app.use(express.urlencoded({extended : true, limit : "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
export {app};