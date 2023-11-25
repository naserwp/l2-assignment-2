import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// Parsers added
app.use(express.json());
app.use(cors());

//  routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our Assaignment-2 API! Applo Level 2 PH',
  });
});

export default app;
