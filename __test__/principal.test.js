const request = require('supertest');
var app = require('../config/custom-express')();

describe('Integration Test', () => {
  //Get balance for non-existing account
  it('Should check if account NOT exist', async () => {

    const response = await request(app).get('/balance').send('account_id=100');
    expect(response.status).toEqual(404);
    expect(response.text).toContain('');

  });

})
