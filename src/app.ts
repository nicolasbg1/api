import express, { Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errorMiddleware } from './middlewares/error';
import { appRoutes } from './routes/routes';

const port = 9000;

const app = express();
app.use(express.json());

const allowedOrigins = [ 'http://localhost:3000' ];
app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(appRoutes);

app.get('*', (req: Request, res: Response) => {
  res.send('Página não  encontrada');
});


app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Api rodando na porta ${port} 🤠 !!!`);
});