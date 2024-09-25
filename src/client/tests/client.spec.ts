import * as supertest from 'supertest';
import { app } from '../../app';
import { execSync } from 'child_process';
import { ProfileService } from '../../profile/profile.service';

describe('Client module tests', () => {
  const api = supertest(app);
  beforeAll(() => {
    execSync(`npm run seed`);
  });

  it(`/balances/deposit/:userId - happy path `, async () => {
    const profileService = new ProfileService();
    const res = await api.post('/balances/deposit/1').set('profile_id', '6').send({ amount: 100 }).expect(200);
    const user = await profileService.getById(1);
    expect(res.body).toBe(user.balance);
  });
});
