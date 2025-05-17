import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// db

await connectDB()

// middleware
app.use(cors())

// Route 
app.get('/', (req, res) => res.send("APi Workings"))
app.post('/clerk', express.json(), clerkWebhooks)


const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{console.log(`server is Running on ${PORT}`)} )