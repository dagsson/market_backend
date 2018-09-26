var appRouter = function (app) {



  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });


 app.get("/farmer/:id", function (req, res) {
   var farmer = [];
   var id = req.params.id;

   

    res.status(200).send(farmer);
    
//    } else {
//      res.status(400).send({ message: 'invalid number supplied' });
//    }

 });
}

module.exports = appRouter;