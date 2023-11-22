import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// Parsers added
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our Assaignment-2 API!',
  });
});

export default app;
