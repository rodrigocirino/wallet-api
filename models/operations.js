var app = require('../config/custom-express')();
var Wallet = require('../models/Wallet');

function getBalance(account_id) {
    //if account_id is not found error, else ok

    console.log(parseInt(account_id), wallet)
    if (wallet != 'undefined' && (parseInt(account_id) == parseInt(wallet._destination))) {
        //404	Get balance for non-existing account  GET /balance?account_id=1234
        return wallet;
    } else {
        //200 Get balance for existing account      GET /balance?account_id=100
        return null;
    }
}

function createAccount(client) {

    //if destination is not found error, else ok
    if (client.destination == undefined) {
        return null;
    } else {
        wallet = new Wallet();
        wallet.amount = client.amount;
        wallet.destination = client.destination;
        return wallet;
    }
    //if account already exist return the same
}

function deposit(amount, destination) {
    //if destination is not found error, else ok
    return wallet;
}


function withdraw(amount, destination) {
    //if account is less amount error, else ok
}


function transfer(amount, destination) {
    //if destination is not found error, else ok
}

module.exports.getBalance = getBalance;
module.exports.deposit = deposit;
module.exports.withdraw = withdraw;
module.exports.transfer = transfer;
module.exports.createAccount = createAccount;