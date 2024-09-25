import * as supertest from 'supertest';
import { app } from '../../app';
import { execSync } from 'child_process';
import { ProfileService } from '../../profile/profile.service';

describe('Job module tests', () => {
  const api = supertest(app);
  beforeAll(() => {
    execSync(`npm run seed`);
  });

  it(`should check /jobs/unpaid`, async () => {
    const response = await api.get('/jobs/unpaid').set('profile_id', '1').expect(200);
    const { body } = response;
    expect(body.length).toBe(1);
    const job = body[0];
    expect(job.paid).toBe(null);
    expect(job.Contract.ClientId).toBe(1);
  });
  it(`should check /jobs/:job_id/pay`, async () => {
    const profileService = new ProfileService();
    const response = await api.post('/jobs/2/pay').set('profile_id', '6').expect(200);
    const { body: job } = response;
    expect(job.paid).toBe(true);
    const client = await profileService.getById(1);
    const contractor = await profileService.getById(6);
    expect(client.balance).toBe(949);
    expect(contractor.balance).toBe(1415);
  });
});
