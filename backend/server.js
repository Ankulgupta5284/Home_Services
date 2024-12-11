import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import connectdb from './config/mongodb.js';
import adminRouter from './routes/adminRoute.js';
import connectCloudinary from './config/cloudinary.js';
import workerRouter from './routes/workerRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectdb();
connectCloudinary();
app.use("/api/admin", adminRouter);
app.use("/api/worker",workerRouter)
app.use("/api/user",userRouter)

app.listen(port, () => console.log(`Server started on PORT:${port}`));
