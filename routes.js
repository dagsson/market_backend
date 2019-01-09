var request = require('request');
var session = require('express-session');
var appRouter = function (app) {
var path = "https://blockchain.advania.is/api"

app.use(session({
  secret: "testx",
  cookie: {maxAge: 3600}
}));

  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get("/Farmer", function(req,res){

    //req.params.id
    //Er til session key?
    console.log(req.session);
    if(!req.session.id)
    {
      //Ef ekki, login og store session key
      console.log("session does not exist!"+userSession.secret);
      var token = login();
      req.session.id = token;
    }

    //Sækja frá api
    var response = request({
      url: path+ "/Farmer/?access_token="+req.session.id
    }, function(error, response, body){
      res.status(200).send(body);
    })
  });

  app.get("/Carcass", function(req,res){

    //req.params.id
    //Er til session key?
    console.log(req.session);
    if(!req.session.id)
    {
      //Ef ekki, login og store session key
      console.log("session does not exist!"+userSession.secret);
      var token = login();
      req.session.id = token;
    }

    //Sækja frá api
    var response = request({
      url: path+ "/Carcass/?access_token="+req.session.id
    }, function(error, response, body){
      res.status(200).send(body);
    })
  });



function login (req, res) {
    var response = request.post({
      url: path +'/CustomUsers/login',
      form: {
        username: 'NotandiTest',
        password: 'NotandiTest123'
      }
    }, function(error,response,body){
      var json = JSON.parse(body);
    });
    return json.id;
  };
}

module.exports = appRouter;