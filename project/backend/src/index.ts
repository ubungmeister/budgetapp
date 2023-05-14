import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { usersRouter } from './routes/users';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);

const server = http.createServer(app);




mongoose.connect('mongodb+srv://admin:admin@cluster0.znm5zkj.mongodb.net/budget?retryWrites=true&w=majority')

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
