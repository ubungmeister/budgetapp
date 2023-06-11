import express from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { AddressInfo } from 'net';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

const server: Server = http.createServer(app);

server.listen(1000, () => {
  const address = server.address() as AddressInfo;
  const port = address.port;
  console.log(`Server running on http://localhost:${port}/`);
});