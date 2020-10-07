const request = require('supertest');
var app = require('../config/custom-express')();

describe('Get Balance Account', () => {

  it('Should check if account exist', async () => {
    const response = await request(app).get('/balance?account_id=100');
    expect(response.status).toEqual(200);
    //expect(response.text).toBeGreaterThan(0);
  });

})
