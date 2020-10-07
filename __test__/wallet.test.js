const request = require('supertest');
var app = require('../config/custom-express')();


describe('Create account with initial balance', async () => {

  it('Should deposit or create and deposit in a new account', async () => {
    const response = await request(app).post('/event').send('{"type":"deposit", "amount":10, "destination":"100"}');
    expect(response.status).toEqual(201);
  });

  it('Should check if account exist', async () => {
    const response = await request(app).get('/balance').query({ account_id: 100 });
    expect(response.status).toEqual(201);
    //expect(response1.text).toBeGreaterThan(0);
  });

  it('Should check if account NOT exist', async () => {
    const response = await request(app).get('/balance').query({ account_id: 1234 });
    expect(response.status).toEqual(404);
    expect(response.text).toEqual("0");
  });

})


