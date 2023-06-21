import express from 'express';
import { fundWallet, transferFunds, withdrawFunds } from '../controllers/walletController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/fund', authenticateUser, fundWallet);
router.post('/transfer', authenticateUser, transferFunds);
router.post('/withdraw', authenticateUser, withdrawFunds);

export default router;