const User = require('../models/UserSchema')

//Is user is existed in database is cheching in the middleware
const isUserExisting = async (req,res,next)=>{
    try {
        const email = req.body.email
        
        const userExist = await User.findOne({email:email})
        if(userExist && userExist.email == email){
           return res.render('registration',{message:"The user already exit.try new one!",resolve:false})
        }      
        next()
        
    } catch (error) {
       console.log(error.message);
       
    }
}

//Is user is existed in database is cheching in the middleware when an admin is try to add a new user
const isAdminAddUserExisting = async (req,res,next)=>{
    try {
        const userEmail = req.body.email
        const userExist = await User.findOne({email:userEmail})
        
        if(userExist && userExist.email == userEmail){
          return res.render('adduser',{message:"The user already exit.try new one!",resolve:false})
        }
        next()
    } catch (error) {
        console.log(error.message);  
    }
}
//Exporting middlewares
module.exports = {isUserExisting,isAdminAddUserExisting}