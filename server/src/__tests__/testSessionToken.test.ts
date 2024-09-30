import api from './helpers/api.js';

describe('extracting session token', () => {
  it('prevent accessing auth protected endpoints without session token', async () => {
    const res = await api
      .get('/api/users/@me')
      .expect(401);

    expect(res.body.message).toBe('session token is missing');
  });
});
