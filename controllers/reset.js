var operations = require('../models/operations');

module.exports = function (app) {

    app.post('/reset', function (req, res) {
        const result = operations.reset();
        console.log('POST /reset : Empty result:', result)
        res.status(200).send('OK');
    });

}
