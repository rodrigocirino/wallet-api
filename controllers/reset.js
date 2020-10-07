module.exports = function (app) {

    //curl http://localhost:3000/reset -X POST -v
    app.post('/reset', function (req, res) {
        console.log("Reset: POST # Reset state before starting tests");

        var wallet = {};

        res.send(wallet);
    })
}