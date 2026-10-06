import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import alertsRouter from './routes/alerts.js';
import authRouter from './routes/users.js'
import { logger } from './middleware/basic.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(logger)

app.use("/api/alerts", alertsRouter)

app.use("/api/auth", authRouter)

app.listen(PORT, ()=>{
    console.log(`server runing on http//:localhost:${PORT}`);
    
});



