const express = require('express');
const routers = require('./routers/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
require("dotenv").config();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(allowCrossDomain);

app.use(cors({
    methods: ['GET','POST','PUT','PATCH'],
    credentials: true, origin: true,
}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

    // res.header("Access-Control-Allow-Origin","*");
    // res.header(
        
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept , Authorization"  
    // );
    // if(req.method === "OPTIONS"){
    //     res.header('Access-Control-Allow-Methods',"GET,PUT,POST,PATCH,DELETE");
    //     return res.status(200).json({});
    // }
    // next();
})


app.use(bodyParser.json());

//initializing routes
app.use('/api',routers);

//
app.use(express.static('public'));

//error handling
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error: err.message});
})
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;
//sending an object to localhost

// app.get('/',function(req,res){
//     res.send({name : 'chohan'})
//     console.log("running at port 400")
// })

app.listen(port,function(){
    console.log("now listening for requests");
})