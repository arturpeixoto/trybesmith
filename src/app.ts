import express from 'express';
import productsRouter from './routers/products.route';
import ordersRouter from './routers/orders.route';
import loginRouter from './routers/login.route';

const app = express();

app.use(express.json());

app.use(productsRouter);
app.use(ordersRouter);
app.use(loginRouter);

export default app;
