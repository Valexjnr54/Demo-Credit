"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const walletRouter_1 = __importDefault(require("./routes/walletRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3100;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRouter_1.default);
app.use('/api/wallet', walletRouter_1.default);
// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
