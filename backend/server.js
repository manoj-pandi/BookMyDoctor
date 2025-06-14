import express from 'express'
// change server type into modular if you import express like above
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.use('/api/admin', adminRouter)
// localhost:4000/api/admin
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})