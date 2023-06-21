import request from 'supertest';
import app from '../src/app';

describe('Wallet Service', () => {
  let token: string;

  beforeAll(async () => {
    // Perform login request and store the token for subsequent requests
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    token = response.body.token;
  });

  describe('POST /api/wallet/fund', () => {
    it('should add funds to the user wallet', async () => {
      const response = await request(app)
        .post('/api/wallet/fund')
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 100, id:1 });

      expect(response.status).toBe(200);
      expect(response.body.walletBalance).toBe(100);
    });
  });

  describe('POST /api/wallet/transfer', () => {
    it('should transfer funds from one user to another', async () => {
      const response = await request(app)
        .post('/api/wallet/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({ senderId:1, recipientEmail: 'recipient@example.com', amount: 50 });

      expect(response.status).toBe(200);
      expect(response.body.senderWalletBalance).toBe(50);
    });
  });

  describe('POST /api/wallet/withdraw', () => {
    it('should withdraw funds from the user wallet', async () => {
      const response = await request(app)
        .post('/api/wallet/withdraw')
        .set('Authorization', `Bearer ${token}`)
        .send({ senderId:1, amount: 25 });

      expect(response.status).toBe(200);
      expect(response.body.walletBalance).toBe(25);
    });
  });
});
