import { Request, Response } from 'express';
import {  User, getUserByID, getUserByEmail } from '../models/user';
import connection from '../database';

const fundWallet =async (req: Request, res: Response) => {
    const { amount, id } = req.body;

    try {
        // Check if the user exists
        const user = await getUserByID(id);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }

        // Update wallet balance in the database
    await connection.query('UPDATE users SET walletBalance = walletBalance + ? WHERE id = ?', [amount, id]);

    // Update user's wallet balance locally
    user.walletBalance += amount;

    return res.json({ "Available Balance": user.walletBalance });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const transferFunds =async (req: Request, res: Response) => {
    const { senderId, recipientEmail, amount } = req.body;

    try {
        const user = await getUserByID(senderId);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }
        const walletBalance = user.walletBalance;

        // Check if sender has sufficient funds
        if (walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Find recipient user in the database
        const recipient = await getUserByEmail(recipientEmail);
        if (!recipient) {
            return res.status(404).json({ message: 'Receipient not Found' });
        }
        const recipientemail = recipient.email;

        // Update sender and recipient wallet balances in the database
        await connection.query(
            ' UPDATE users SET walletBalance = walletBalance + ? WHERE email = ?',
            [ amount, recipientemail]
        );
        await connection.query(
            'UPDATE users SET walletBalance = walletBalance - ? WHERE id = ?',
            [amount, senderId]
        );
        // Update sender and recipient wallet balances locally
        user.walletBalance -= amount;
        recipient.walletBalance += amount;

        return res.json({ "Available Balance": user.walletBalance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const withdrawFunds =async (req: Request, res: Response) => {
    const { senderId, amount } = req.body;

    try {
        const user = await getUserByID(senderId);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }
        const walletBalance = user.walletBalance;

        // Check if sender has sufficient funds
        if (walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }


        // Update sender and recipient wallet balances in the database
        await connection.query(
            'UPDATE users SET walletBalance = walletBalance - ? WHERE id = ?',
            [amount, senderId]
        );
        // Update sender and recipient wallet balances locally
        user.walletBalance -= amount;

        return res.json({ 'Available Balance ': user.walletBalance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export { fundWallet, transferFunds, withdrawFunds };