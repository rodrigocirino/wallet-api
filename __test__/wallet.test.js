const request = require('supertest');
var app = require('../config/custom-express')();
var operations = require('../models/operations');

describe('Ebanx Test Suite - Wallet API', () => {

  // 200 Reset the state before starting POST / reset tests
  it('Reset the state before starting', async () => {
    const response = await request(app).post('/reset');
    //200 Ok
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Ok');
  });

  // 201 Create account with opening balance POST / event {"type": "deposit", "amount": 10, "destination": "100"}
  test('Deposit in a account or create and deposit a new account', () => {

    var params = { "type": "deposit", "amount": 10, "destination": "100" };
    const response = operations.deposit(params);
    console.log("POST Deposit: ", response);
    //'201 {"destination": {"id":"100", "balance":10}}'
    expect(response).not.toBeNull();
    expect(response.amount).toEqual(10);
    expect(response.destination).toEqual(params.destination);

  });

  // 201 Deposit in existing account POST / event {"type": "deposit", "amount": 10, "destination": "100"}
  test('Deposit plus amount in a destination account', () => {

    var params = { "type": "deposit", "amount": 10, "destination": "100" };
    const response = operations.deposit(params);
    console.log("POST Deposit: ", response);
    //'201 {"destination": {"id":"100", "balance":20}}'
    expect(response).not.toBeNull();
    expect(response.amount).toEqual(20);
    expect(response.destination).toEqual(params.destination);

  });

  // 200 Get balance for existing GET / balance account? account_id = 100
  test('Check if a account exists e return it the ammount', () => {
    var account_id = 100
    const response = operations.getAccount(account_id);
    console.log("GET Balance: ", response);
    //200 20
    expect(response.amount).toEqual(20);
    expect(response.destination).not.toBeNull();
  });

  // 404 Get balance for non-existent GET / balance account? account_id = 1234
  test('Check if a account NOT exists e return it the ammount', () => {
    var account_id = 1234
    const response = operations.getAccount(account_id);
    console.log("GET Balance: ", response);
    //400 0
    expect(response).toBeNull();
  });

  // 404 Withdraw from a non-existent account POST / event {"type": "withdraw", "origin": "200", "amount": 10}
  test('Withdraw from a non-existent account', () => {

    var params = { "type": "withdraw", "origin": "200", "amount": 10 };
    const response = operations.withdraw(params);
    console.log("POST Withdraw: ", response);
    //400 0
    expect(response).toBeNull();
  });

  // 201 Withdraw from existing account POST / event {"type": "withdraw", "origin": "100", "amount": 5}
  test('Withdraw from existing account', () => {

    var params = { "type": "withdraw", "origin": "100", "amount": 5 };
    const response = operations.withdraw(params);
    console.log("POST Withdraw: ", response);
    //201 {'origin': {'id':100, 'balance':15}}
    expect(response).not.toBeNull();
    expect(response.amount).toEqual(15);
    expect(response.destination).toEqual(params.origin);
  });

  // 201 Transfer from existing account POST / event {"type": "transfer", "origin": "100", "amount": 15, "destination": "300"}
  test('Transfer from origin account to destination account', () => {

    var params = { "type": "transfer", "origin": "100", "amount": 15, "destination": "300" };
    const response = operations.transfer(params);
    console.log("POST Withdraw Existent Account: ", response);
    //201 {'origin': {id:100, balance:0}, 'destination': {'id':300, 'balance':15}}
    expect(response).not.toBeNull();
    expect(response.origin.destination).toEqual(params.origin);
    expect(response.origin.amount).toEqual(0);
    expect(response.destination.destination).toEqual(params.destination);
    expect(response.destination.amount).toEqual(15);
  });

  // 404 Transfer of non-existent account POST / event {"type": "transfer", "origin": "200", "amount": 15, "destination": "300"}
  test('NO Transfer if no-existent account OR the amount is insufficient', () => {

    var params = { "type": "transfer", "origin": "200", "amount": 15, "destination": "300" };
    const response = operations.transfer(params);
    console.log("POST Withdraw INExistent Account: ", response);
    //400 0
    expect(response).toBeNull();
  });


})



