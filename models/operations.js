var app = require('../config/custom-express')();
var Wallet = require('../models/Wallet');
var wallet;

function getAccount(account_id) {
    //if account_id is not found error, else ok

    console.log(account_id, wallet);
    if (wallet != undefined &&
        (parseInt(account_id) == parseInt(wallet.destination))) {
        //404	Get balance for non-existing account  GET /balance?account_id=1234
        return wallet;
    } else {
        //200 Get balance for existing account      GET /balance?account_id=100
        return null;
    }
}

function deposit(body) {
    //if destination is not found create a new account, else ok
    var result = this.getAccount(body.destination);
    if (result != null) {
        wallet._amount = wallet.amount + body.amount;
    }
    //account found deposit the amount
    else {
        wallet = new Wallet();
        wallet._destination = body.destination;
        wallet._amount = body.amount;
    }
    return wallet;
}


function withdraw(amount, destination) {
    //if account is less amount error, else ok
}


function transfer(amount, destination) {
    //if destination is not found error, else ok
}

module.exports.getAccount = getAccount;
module.exports.deposit = deposit;
module.exports.withdraw = withdraw;
module.exports.transfer = transfer;