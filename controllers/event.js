var operations = require('../models/operations');

module.exports = function (app) {


    //curl http://localhost:3000/event -X POST -H "Content-type: application/json" -d '{"type":"deposit", "amount":10, "destination":"100"}'
    app.post('/event', function (req, res) {
        console.log("Event: POST # Create account with initial balance", req.body.type);

        switch (req.body.type) {
            case 'deposit':
                console.log("Depositing");
                //201	Depósito na conta existente POST /event {"type":"deposit", "amount":10, "destination":"100"}
                //201   Criar conta com saldo inicial  POST /event {"type":"deposit", "amount":10, "destination":"100"}
                const dep = operations.deposit(req.body);
                console.log(dep);
                res.type('application/json');
                res.status(201).send(dep);
                break;
            case 'withdraw':
                //404	Retirar de uma conta inexistente	POST /event {"type":"withdraw", "origin":"200", "amount":10}
                //201	Retirar da conta existente		    POST /event {"type":"withdraw", "origin":"100", "amount":5}
                console.log("Withdrawing");
                var withd = operations.withdraw(req.body);
                console.log(withd);
                res.type('application/json');
                res.status(201).send(withd);
                break;
            case 'transfer':
                //201	Transferência da conta existente	POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
                //404	Transferência de conta não existente    POST /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}
                console.log("Transfering");
                const transf = operations.transfer(req.body);
                console.log(transf);
                res.type('application/json');
                res.status(201).send(transf);
                break;
        }

        res.status(504);
    })










}