import express from 'express';
import http from 'http';
import cors from 'cors';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

const server = http.createServer(app);


server.listen(1000, () => {
  console.log('Server running on http://localhost:1000/');
});
