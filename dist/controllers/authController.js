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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUserEmail = yield (0, user_1.getUserByEmail)(email);
        if (existingUserEmail) {
            return res.status(409).json({ message: 'Email address already exists' });
        }
        const existingUser = yield (0, user_1.getUserByUsername)(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the user
        const user = { id: 0, fullname, email, username, password: hashedPassword, walletBalance: 0 };
        const createdUser = yield (0, user_1.createUser)(user);
        res.json(createdUser);
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = yield (0, user_1.getUserByUsername)(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare the password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ user: user }, 'k735hV6eslAeyfIEVAMqinMGhgNO9bFDH9pCZMWZyedPSiNm9xlFMsGheziA6eADFHFGfuyjhfvyuGFUYgfyjdy');
        res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
