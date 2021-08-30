var express = require('express');
var router = express.Router();
var user =require('../models/usermodels');
var bcrypt =require('bcryptjs');
var jwt_token =require('../controller/jwt_token _creation')
var jwt_verify =require('../controller/jwt_verify');
var jwt =require('jsonwebtoken');


router.post('/register',async(req,res)=>{
const {name,contact,address,gender,country,email,password}= req.body;

    if(!(name&&contact&&address&&gender&&country&&email&&password)){
        res.send("all the input is required")
    }
    else{
        const newuser = new user({
            name:name,
            contact:contact,
            address:address,
            gender:gender,
            country:country,
            email:email,
            password:await bcrypt.hash(password,10)
            

        });

        
    const token = jwt_token(name,email)

    newuser.token =token

    try {
        await newuser.save();
        res.status(201).json(newuser);
    }
         catch(error) {
        res.status(400).json({ error:error.message});
    }

        
}
});

router.post('/login',async (req,res)=>{
    const {email,password}= req.body;
    if(!(email&&password)){
        res.send("all the input is required")
    }
    else {
        let user_info = await user.findOne({email:email})
        //console.log(user_info);
        if (user_info!=null){
            let pass_check = await bcrypt.compare(password,user_info.password);
            if (pass_check){
                const token =jwt_token(user_info.name,user_info.email);
                  await user.updateOne({email:user_info.email},{$set :{
                    "token" :token}}
                  );
                  
             res.status(200).json({email:user_info.email});
            }
            else{
                res.status(401).send("please verify password ")
            }
        }
        else{
            res.status(401).send("please verify email")
        }

        
    }

})




router.get('/search',jwt_verify,async (req,res)=>{
    
    let search = req.query;
    let result =await user.find(search)
    res.status(200).send(result)
});


router.get('/logout',jwt_verify,async (req,res)=>{
    const user_detail=await user.findOne({email:req.user.email});
    console.log(user_detail.token);
    user_detail.token="";
    try {
        await user_detail.save();
        res.status(200).json(user_detail);
    }
         catch(error) {
        res.status(400).json({ error:error.message});
    }

})




module.exports = router;