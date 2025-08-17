import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connetCloudinary from './configs/cloudinary.js';

const app = express();

// db Connet

await connectDB()

// connet Cloudinary
await connetCloudinary()

// middleware
app.use(cors())
app.use(clerkMiddleware())

// Route 
app.get('/', (req, res) => res.send("APi Workings"))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', educatorRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{console.log(`server is Running on ${PORT}`)})

