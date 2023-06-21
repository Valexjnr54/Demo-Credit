"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFunds = exports.transferFunds = exports.fundWallet = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, id } = req.body;
    try {
        // Check if the user exists
        const user = yield (0, user_1.getUserByID)(id);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }
        // Update wallet balance in the database
        yield database_1.default.query('UPDATE users SET walletBalance = walletBalance + ? WHERE id = ?', [amount, id]);
        // Update user's wallet balance locally
        user.walletBalance += amount;
        return res.json({ "Available Balance": user.walletBalance });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fundWallet = fundWallet;
const transferFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, recipientEmail, amount } = req.body;
    try {
        const user = yield (0, user_1.getUserByID)(senderId);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }
        const walletBalance = user.walletBalance;
        // Check if sender has sufficient funds
        if (walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        // Find recipient user in the database
        const recipient = yield (0, user_1.getUserByEmail)(recipientEmail);
        if (!recipient) {
            return res.status(404).json({ message: 'Receipient not Found' });
        }
        const recipientemail = recipient.email;
        // Update sender and recipient wallet balances in the database
        yield database_1.default.query(' UPDATE users SET walletBalance = walletBalance + ? WHERE email = ?', [amount, recipientemail]);
        yield database_1.default.query('UPDATE users SET walletBalance = walletBalance - ? WHERE id = ?', [amount, senderId]);
        // Update sender and recipient wallet balances locally
        user.walletBalance -= amount;
        recipient.walletBalance += amount;
        return res.json({ "Available Balance": user.walletBalance });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.transferFunds = transferFunds;
const withdrawFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, amount } = req.body;
    try {
        const user = yield (0, user_1.getUserByID)(senderId);
        if (!user) {
            return res.status(404).json({ message: 'User not Found' });
        }
        const walletBalance = user.walletBalance;
        // Check if sender has sufficient funds
        if (walletBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }
        // Update sender and recipient wallet balances in the database
        yield database_1.default.query('UPDATE users SET walletBalance = walletBalance - ? WHERE id = ?', [amount, senderId]);
        // Update sender and recipient wallet balances locally
        user.walletBalance -= amount;
        return res.json({ 'Available Balance ': user.walletBalance });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.withdrawFunds = withdrawFunds;
