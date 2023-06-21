"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'k735hV6eslAeyfIEVAMqinMGhgNO9bFDH9pCZMWZyedPSiNm9xlFMsGheziA6eADFHFGfuyjhfvyuGFUYgfyjdy');
        // req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
