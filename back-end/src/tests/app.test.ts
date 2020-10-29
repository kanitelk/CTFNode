import app from '../app';
import request from 'supertest';

describe('asd', () => {
  test('test', async () => {
    const responce = await request(app).get('/')
    expect(responce.status).toBe(404);
  })
})