import express from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/auth';
import { budgetRouter } from './routes/budget';
import { AddressInfo } from 'net';
import { pocketMoneyRouter } from './routes/pocketmoney';
import { cashFlowRouter } from './routes/cashflow';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/budget', budgetRouter)
app.use('/pocketmoney', pocketMoneyRouter)
app.use('/cashflow', cashFlowRouter)

const server: Server = http.createServer(app);

server.listen(1000, () => {
  const address = server.address() as AddressInfo;
  const port = address.port;
  console.log(`Server running on http://localhost:${port}/`);
});