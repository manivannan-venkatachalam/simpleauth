var mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    name:{
        type:String
    },
    contact:{
        type:Number
    },
    address:{
        type:String
    },gender:{
        type: String, 
        enum : ['female','male','other'], default: 'male' 
    }
    ,country:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
})


var userModel =mongoose.model('users',userSchema);

module.exports = userModel;