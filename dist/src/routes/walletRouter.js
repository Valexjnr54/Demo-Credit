"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controllers/walletController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/fund', authMiddleware_1.authenticateUser, walletController_1.fundWallet);
router.post('/transfer', authMiddleware_1.authenticateUser, walletController_1.transferFunds);
router.post('/withdraw', authMiddleware_1.authenticateUser, walletController_1.withdrawFunds);
exports.default = router;
