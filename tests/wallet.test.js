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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Wallet Service', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Perform login request and store the token for subsequent requests
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            username: 'test',
            password: 'password123',
        });
        token = response.body.token;
    }));
    describe('POST /api/wallet/fund', () => {
        it('should add funds to the user wallet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/wallet/fund')
                .set('Authorization', `Bearer ${token}`)
                .send({ amount: 100, id: 1 });
            expect(response.status).toBe(200);
            expect(response.body.walletBalance).toBe(100);
        }));
    });
    describe('POST /api/wallet/transfer', () => {
        it('should transfer funds from one user to another', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/wallet/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({ senderId: 1, recipientEmail: 'recipient@example.com', amount: 50 });
            expect(response.status).toBe(200);
            expect(response.body.senderWalletBalance).toBe(50);
        }));
    });
    describe('POST /api/wallet/withdraw', () => {
        it('should withdraw funds from the user wallet', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/api/wallet/withdraw')
                .set('Authorization', `Bearer ${token}`)
                .send({ senderId: 1, amount: 25 });
            expect(response.status).toBe(200);
            expect(response.body.walletBalance).toBe(25);
        }));
    });
});
