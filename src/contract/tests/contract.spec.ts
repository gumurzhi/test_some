import * as supertest from 'supertest';
import { app } from '../../app';
import { execSync } from 'child_process';
import { CONTRACT_STATUS } from '../constants';

describe('Contract module tests', () => {
  const api = supertest(app);
  beforeAll(() => {
    execSync(`npm run seed`);
  });

  it(`should check contracts, where I'm a client `, async () => {
    const response = await api.get('/contracts').set('profile_id', '1').expect(200);
    const { body } = response;
    expect(body.length).toBe(1);
    expect(body[0].ClientId).toBe(1);
    expect(body[0].status).toBe(CONTRACT_STATUS.IN_PROGRESS);
  });
  it(`should check contracts, where I'm a contractor `, async () => {
    const response = await api.get('/contracts').set('profile_id', '7').expect(200);
    const { body } = response;
    expect(body.length).toBe(3);
    expect(body.every((c) => c.status === CONTRACT_STATUS.IN_PROGRESS && c.ContractorId === 7)).toBe(true);
  });
  it(`should check /contracts/:id: contract exists. I'm a client`, async () => {
    const response = await api.get('/contracts/1').set('profile_id', '1').expect(200);
    const { body } = response;
    expect(body.id).toBe(1);
    expect(body.ClientId).toBe(1);
  });
  it(`should check /contracts/:id: contract exists. I'm a contractor`, async () => {
    const response = await api.get('/contracts/1').set('profile_id', '5').expect(200);
    const { body } = response;
    expect(body.id).toBe(1);
    expect(body.ClientId).toBe(1);
  });
  it(`should check /contracts/:id: contract not found`, async () => {
    await api.get('/contracts/3').set('profile_id', '1').expect(404);
  });
});
