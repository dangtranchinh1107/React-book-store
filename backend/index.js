import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import router 
import router from './router/routerBook.js'
import cors from 'cors'

const app = express();
app.use(express.json());
// kết nối frony-end
app.use(cors())

dotenv.config();
const { PORT, mongoDB } = process.env

app.use('/api', router)
// kết nối database
const connectDB = async () => {
    try {
        await mongoose.connect(`${mongoDB}`);
        console.log('Mongodb connencted ');
        app.listen(PORT, () => {
            console.log(`Back-end is running ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
connectDB();