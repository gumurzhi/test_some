import * as supertest from 'supertest';
import { app } from '../../app';
import { execSync } from 'child_process';

describe('Admin module tests', () => {
  const api = supertest(app);
  beforeAll(() => {
    execSync(`npm run seed`);
  });

  it(`/admin/best-profession test`, async () => {
    const res = await api
      .get('/admin/best-profession')
      .set('profile_id', '6')
      .query({ start: '2024-08-12 19:18:55.669', end: new Date().toISOString() })
      .expect(200);
    expect(res.body).toBe('Programmer');
  });
  it('should test /admin/best-clients - default limit', async () => {
    const res = await api
      .get('/admin/best-clients')
      .set('profile_id', '6')
      .query({ start: '2024-08-12 19:18:55.669', end: new Date().toISOString() })
      .expect(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].id).toBe(4);
  });
  it('should test /admin/best-clients - limit 4', async () => {
    const res = await api
      .get('/admin/best-clients')
      .set('profile_id', '6')
      .query({ start: '2024-08-12 19:18:55.669', end: new Date().toISOString(), limit: 4 })
      .expect(200);
    expect(res.body.length).toBe(4);
    expect(res.body[0].id).toBe(4);
  });
});
