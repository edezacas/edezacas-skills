import express from 'express';
import { userRouter } from './routes/users';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/users', userRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
