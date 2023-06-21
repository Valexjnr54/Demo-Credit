import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter';
import walletRouter from './routes/walletRouter';

dotenv.config();

const app = express();
const port = 3100;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/wallet', walletRouter);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;