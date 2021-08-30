var express =  require('express');
var app =express();
var mongoose = require('mongoose');
var auth_routes =require('./Routes/auth_route');
require('dotenv').config();



app.use(express.json());

//connectio for mongodb

mongoose.connect('mongodb+srv://Mani:Mani@123@cluster0.ildam.mongodb.net/simple_auth?retryWrites=true&w=majority');
const con= mongoose.connection;
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}
//auth middleware

app.use(auth_routes);


app.get('/',(req,res)=>{
res.send("<h1>welcome to Simple Auth<h1>")
})


app.listen(process.env.PORT || 5000,(err)=>{
    if(err){
        console.log("error in listening")
    }
    else{
        console.log(`server listening${process.env.PORT}` )
    }
})