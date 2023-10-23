import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import authRouter from './routes/auth.js'
dotenv.config();

mongoose.connect('mongodb+srv://rishavpandey:Brssp123@mern-carrental.wclvith.mongodb.net/?retryWrites=true&w=majority')

const app = express();

app.listen(3000, () => {
console.log('Server is running on port 3000')
});

app.use("/api/user", userRouter)
app.use('/api/auth', authRouter)

