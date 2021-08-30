const jwt =require('jsonwebtoken');
require('dotenv').config();

module.exports = function (name,email){
   let token= jwt.sign(
        { name:name , email:email },
        process.env.secret,
        {
          expiresIn: "2h",
        }
      );
      console.log(token);
 return token;
}