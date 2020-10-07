module.exports = function(app){

  app.get('/balance', function(req, res){
    console.log('GET /balance')
    res.status(404).send('NOK.');
  });

}
