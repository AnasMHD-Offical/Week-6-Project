const User = require("../models/UserSchema")
const express = require('express')
const bcrypt = require('bcrypt')
const securePassword = async(password) => {
    try {
        const passwordHased = await bcrypt.hash(password, 10)
        return passwordHased
    } catch (error) {
        console.log(error.message);
        
    }
}
//Register Route

const loadRegister = async (req,res)=>{
    try { 
       res.render('registration',{message:"Welcome to the User Registration!",resolve:true})
    } catch (error) {
        console.log(error.message);
    }
}

//Adding a new user

const insertUser = async (req,res)=>{
    try {
        const sPassword = await securePassword(req.body.password)
         const user =  new User({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:sPassword,
            is_admin:0
         })
        const userData = await user.save()
        console.log(userData);  
        if(userData){
            res.render('registration',{message:"Your registration has been successfully",resolve : true})
        }else{
            res.render('registration',{message:"Your registration has been failed",resolve:false})

        }
    } catch (error) {
        console.log(error.message);   
    }
}

// login page load
const loginLoad = async (req,res)=>{
    try {
        res.render('login',{message:"Welcome to Sign In page",resolve:true})
    } catch (error) {
        console.log(error.message);
        
    }
}
// Login verification
const verifyLogin = async (req,res) =>{
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = await User.findOne({email:email})
        if(userData){

           const verifyPass = await bcrypt.compare(password,userData.password)
            if(verifyPass){
                req.session.userId = userData._id                
                res.redirect('/dashboard')
            }else{
                //we can provide the password is incorrect but if a hacker can easy assess when they know the email is correct.So this method is easy for the user security 
                res.render('login',{message:"Invalid Email and Password!",resolve:false})
            }
        }else{
            res.render('login',{message:"Invalid Email and Password!",resolve:false})
        }
    } catch (error) {
        console.log(error.message);
        
    }
}

// Dashboard 
const renderDashboard = async (req,res)=>{
    try {
        const userData = await User.findOne({_id:req.session.userId})
        const locals = {
             name : userData.name
        }
        res.render("dashboard",{locals})
    } catch (error) {
        console.log(error.message);
        
    }
}
//User Logout

const userLogout = async (req,res)=>{
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        
    }
}

//Exporting the conntrollers

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    renderDashboard,
    userLogout
} 
