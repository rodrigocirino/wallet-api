var wallet = require("../models/Wallet");

function getBalance(destination) {
    //if destination is not found error, else ok
    //Mock:
    wallet.accountId = 100;

    if (destination == undefined || destination != wallet.accountId) {
        //404	Get balance for non-existing account  GET /balance?account_id=1234
        return null;
    } else {
        //200 Get balance for existing account      GET /balance?account_id=100
        return wallet;
    }
};

function createAccount(wallet) {

    //if destination is not found error, else ok
    if (wallet == undefined) {
        return null;
    } else {
        mainAccount.amount = wallet.amount;
        mainAccount.destination = wallet.destination;
    }
    //if the same return the same
    return mainAccount;
}

function deposit(amount, destination) {
    //if destination is not found error, else ok
    return mainAccount;
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