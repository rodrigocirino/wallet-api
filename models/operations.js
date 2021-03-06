var app = require('../config/custom-express')();
var Wallet = require('../models/Wallet');
var allWallet = [];


function getAccount(account_id) {
    //if account_id is not found error, else ok

    for (var key in allWallet) {
        var client = allWallet[key];
        console.log("Found wallet -->", allWallet[key]);
        if (client.destination != undefined &&
            (parseInt(account_id) == parseInt(client.destination))) {
            //200 Get balance for existing account      GET /balance?account_id=100
            return client;
        }
    }
    return null;
}

/*
 * As the creation account endpoint is the same
 *   as the deposit I kept in the same function
 */
function deposit(body) {
    //if destination is not found create a new account, else ok
    var client = this.getAccount(body.destination);
    if (client != null) {
        client._amount = client.amount + body.amount;
    }
    //account found deposit the amount
    else {
        client = new Wallet();
        client._destination = body.destination;
        client._amount = body.amount;
        allWallet.push(client);
    }
    return client;
}


function withdraw(body) {
    var client = this.getAccount(body.origin);
    if (client != null && client.amount >= body.amount) {


        /*
         *
         * Descomentar se quiser aplicar a regra de retirada de no máximo 50% do total da conta
         * Os testes foram ajustados e passaram, mas no site IPKISS Tester não foram ajustados e quebra na operacao de transferencia.
         *
         *
         */

        //if (body.amount <= (client.amount / 2)) {
        client._amount = client.amount - body.amount;
        return client;
        //}
    }
    return null;
}

function transfer(body) {

    var origin = { 'origin': body.origin, 'amount': body.amount };
    origin = this.withdraw(origin);

    if (origin != null) {//No transfer
        var destination = { 'destination': body.destination, 'amount': body.amount };
        destination = this.deposit(body);
        return { origin, destination };
    }
    return null;
}


function reset() {
    allWallet = [];
}

module.exports.getAccount = getAccount;
module.exports.deposit = deposit;
module.exports.withdraw = withdraw;
module.exports.transfer = transfer;
module.exports.reset = reset;