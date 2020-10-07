var operations = require('../models/operations');

module.exports = function (app) {

  app.get('/balance', function (req, res) {
    const wallet = operations.getBalance(req.query.account_id);
    console.log('GET /balance', wallet)

    if (wallet == null) {
      //404	Get balance for non-existing account  GET /balance?account_id=1234
      res.status(404).send('0');
    } else {
      //200 Get balance for existing account      GET /balance?account_id=100
      res.status(200).send('' + wallet.amount);
    }
  });

}
