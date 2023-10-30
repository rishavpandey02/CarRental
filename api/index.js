import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-route.js';
import authRouter from './routes/Auth-route.js';
import listingRouter from './routes/car-listing-route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT
mongoose.connect("mongodb+srv://rishavpandey:Brssp123@mern-carrental.wclvith.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


const app = express();

app.use(express.json());

app.use(cookieParser());



app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode= err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res. status(statusCode).json({
        success: false, 
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port'+ process.env.PORT)
    });