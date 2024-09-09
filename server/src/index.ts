import cors from 'cors';
import express from 'express';
import './config/db';
import './config/env';
import Routes from './routes';

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

new Routes(app)


app.listen(process.env.PORT ?? "3001", () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})