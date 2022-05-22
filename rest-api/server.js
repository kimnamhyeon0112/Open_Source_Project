const express = require('express');
const mongoose = require('mongoose');
const server = express();
const User = require('./models/User');
const bodyParser = require("body-parser");
require("dotenv").config({path:"variables.env"});

server.use=(bodyParser.json());

server.listen(3000,(err)=>{
    if(err){
        return console.log(err);
    }else{
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true}, (err)=> {
    if(err){
        console.log(err);
    }else{
        console.log('Connected to database successfully');
        console.log();
    }

})
    }
})

