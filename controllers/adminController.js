const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const adminControl = express()
adminControl.use(express.json())
adminControl.use(express.urlencoded({extended:true}))

//password hashing
const securePassword = async(password) => {
    try {
        const passwordHased = await bcrypt.hash(password, 10)
        return passwordHased
    } catch (error) {
        console.log(error.message);
        
    }
}

//loding admin login page
const loadLogin = async (req, res) => {
    try {
        res.render('Adminlogin', { message: "Welcome to admin Login", resolve: true })
    } catch (error) {
        console.log(error.message);

    }
}

//verifing admin
const verifyAdminLogin = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const adminData = await User.findOne({ email: email })
        if (adminData) {
            const verifyAdminPass = await bcrypt.compare(password, adminData.password)
            if (verifyAdminPass) {
                if (adminData.is_admin === 0) {
                    res.render('Adminlogin', { message: "Invalid email and password", resolve: false })
                } else {
                    req.session.userId = adminData._id;
                    res.redirect('/admin/dashboard')
                }
            } else {
                res.render('Adminlogin', { message: "Invalid email and password", resolve: false })
            }
        } else {
            res.render('Adminlogin', { message: "Invalid email and password", resolve: false })
        }
    } catch (error) {
        console.log(error.message)
    }
}

//Admin login
const loadAdminDashboard = async (req, res) => {
    try {
        const userId = req.session.userId
        const adminName = await User.findOne({ _id: userId })
        const locals = {
            name: adminName.name
        }
        res.render('adminDash', { locals })
    } catch (error) {
        console.log(error.message)
    }
}

//admin logout
const adminLogout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message);

    }
}

// Admin pannel
const adminpanel = async (req, res) => {
    try {
        const usersData = await User.find({is_admin:0})
        res.render('adminpannel',{users:usersData})
    } catch (error) {
        console.log(error.message)
    }
}

// Add new user by admin 
const addUser = async (req,res)=>{
    try {
        res.render('adduser',{message:"Welcome Admin to the new user adding page",resolve:true})
    } catch (error) {
        console.log(error);
        
    }
}

//Insert add user data 
const insertaddUser = async (req,res) => {
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
        if(userData){
            res.render('adduser',{message:"Admin added new user successfully",resolve : true})
        }else{
            res.render('adduser',{message:"Something went wrong cannot add new user!",resolve:false})

        }
    } catch (error) {
        console.log(error);  
    }
}

//admin edit user 
const editUser = async (req,res) =>{
    try {
        const userId = req.query.id
        const userData = await User.findOne({_id:userId})
        if(userData){
            res.render('editUser',{user:userData,message:"Welcome admin to the user edit pannel",resolve:true})
        }else{
            res.redirect('/admin/adminpanel')
        }
    } catch (error) {
        console.log(error.message)
    }
}

//Update user based on admin update user
const updateUser = async (req,res) =>{
    try {
        const userId = req.body.userId
        const sPassword = await securePassword(req.body.password)
        const updateUser = await User.findByIdAndUpdate({_id:userId},{$set:{
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:sPassword
        }})
        res.redirect('/admin/adminpanel')
    } catch (error) {
        console.log(error.message);
        
    }
} 

// delete user based on the id 
const deleteUser = async (req,res) =>{
    try {
        const userId = req.query.id
        await User.deleteOne({_id:userId})
        res.redirect('/admin/adminpanel')
    } catch (error) {
        console.log(error.message);  
    }
}

// search user 
const searchUser = async (req,res) =>{
    try {
        const search = req.body.search
        console.log(search);
        
        const searchformat= search.replace(/[^a-zA-Z0-9]/g,"")
        const searchData = await User.find({
            name:{$regex: new RegExp(searchformat,"i")},
            is_admin:0
        })
        console.log(searchData);
        
        res.render('searchUser',{users:searchData})
    } catch (error) {
        console.log(error.message);
        
    }
}


//Exporting the conntrollers

module.exports = {
    loadLogin,
    verifyAdminLogin,
    loadAdminDashboard,
    adminLogout,
    adminpanel,
    addUser,
    insertaddUser,
    editUser,
    updateUser,
    deleteUser,
    searchUser,
}