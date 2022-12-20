const express = require('express');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
const port = 2356;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://msilvaa28_:<1234567>@cluster0.s6een9e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('Não estas logado!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    if (user == 'Rafael' && pass == 'Tati123') {
 
  
        next();
    } else {
        var err = new Error('Não estas Logado!');
        res.setHeader('WWW-Authenticate', 'Basic');
    }
 
}
app.use(authentication)

connect.then(()=>{
    let pratos = require("./Controllers/menu_do_dia");
    console.log("Conectado ao servidor");
    app.use("/pratos", pratos);
    app.listen(port, () =>  console.log("Servidor a correr"));
    
    })

   