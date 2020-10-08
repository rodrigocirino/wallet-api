var operations = require('../models/operations');

module.exports = function (app) {


    //curl http://localhost:3000/event -X POST -H "Content-type: application/json" -d '{"type":"deposit", "amount":10, "destination":"100"}'
    app.post('/event', function (req, res) {
        console.log("Event: POST # Create account with initial balance", req.body.type);
        //res.type('application/json');

        switch (req.body.type) {
            case 'deposit':
                console.log("Depositing");
                const dep = operations.deposit(req.body);
                console.log(dep);
                if (dep != null) {
                    //201   Criar conta com saldo inicial  POST /event {"type":"deposit", "amount":10, "destination":"100"}
                    //201	Depósito na conta existente POST /event {"type":"deposit", "amount":10, "destination":"100"}
                    var data = { "destination": { "id": dep.destination, "balance": dep.amount } }
                    res.status(201).send(data);
                } else {
                    res.status(404).send('0');
                }
                break;
            case 'withdraw':
                console.log("Withdrawing");
                var withd = operations.withdraw(req.body);
                if (withd == null) {
                    //404	Retirar de uma conta inexistente	POST /event {"type":"withdraw", "origin":"200", "amount":10}
                    res.status(404).send('0');
                } else {
                    //201	Retirar da conta existente		    POST /event {"type":"withdraw", "origin":"100", "amount":5}
                    var data = { "origin": { "id": withd.destination, "balance": withd.amount } };
                    res.status(201).send(data);
                }
                break;
            case 'transfer':
                console.log("Transfering");
                const transf = operations.transfer(req.body);
                if (transf == null) {
                    //404	Transferência de conta não existente    POST /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}
                    res.status(404).send('0');
                } else {
                    //201	Transferência da conta existente	POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
                    var data = {
                        "origin": {
                            "id": transf.origin.destination,
                            "balance": transf.origin.amount
                        },
                        "destination": {
                            "id": transf.destination.destination,
                            "balance": transf.destination.amount
                        }
                    }
                    res.status(201).send(data);
                }
                break;
        }

    })










}