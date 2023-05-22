import express from 'express';
import http from 'http';
import cors from 'cors';
import { usersRouter } from './routes/users';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);

const server = http.createServer(app);


server.listen(1000, () => {
  console.log('Server running on http://localhost:1000/');
});
