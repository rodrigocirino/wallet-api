var operations = require('../models/operations');

module.exports = function (app) {

    //201   Criar conta com saldo inicial         POST /event {"type":"deposit", "amount":10, "destination":"100"}

    //curl http://localhost:3000/event -X POST -H "Content-type: application/json" -d '{"type":"deposit", "amount":10, "destination":"100"}'
    app.post('/event', function (req, res) {
        console.log("Event: POST # Create account with initial balance");

        const wallet = operations.createAccount(req.body);
        console.log(wallet);

        res.send(wallet);
    })



    //201	Depósito na conta existente		    POST /event {"type":"deposit", "amount":10, "destination":"100"}

    //404	Retirar de uma conta inexistente	POST /event {"type":"withdraw", "origin":"200", "amount":10}

    //201	Retirar da conta existente		    POST /event {"type":"withdraw", "origin":"100", "amount":5}

    //201	Transferência da conta existente	POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}

    //404	Transferência de conta não existente    POST /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}




}