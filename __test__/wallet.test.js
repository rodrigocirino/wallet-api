const request = require('supertest');
var app = require('../config/custom-express')();

describe('Create account with initial balance', () => {

  it('Should create a new account', async () => {
    const response = await request(app).post('/event').send('{"type":"deposit", "amount":10, "destination":"100"}');
    expect(response.status).toEqual(200);
    //expect(response.text).toBeGreaterThan(0);
  });

  it('Should check if account exist', async () => {
    const response = await request(app).get('/balance').query({ account_id: 100 });
    expect(response.status).toEqual(200);
    //expect(response.text).toBeGreaterThan(0);
  });

})
