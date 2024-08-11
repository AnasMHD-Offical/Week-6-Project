const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')


const loadLogin = async (req,res) => {
    try {
        res.render('Adminlogin',{message:"Welcome to admin Login",resolve:true})
    } catch (error) {
        console.log(error.message);
        
    }
}

const verifyAdminLogin = async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const adminData = await User.findOne({email:email})
        if(adminData){
            const verifyAdminPass = await bcrypt.compare(password,adminData.password)
            if(verifyAdminPass){
                if(adminData.is_admin === 0){
                    res.render('Adminlogin',{message:"Invalid email and password",resolve:false})
                }else{
                    req.session.userId = adminData._id;
                    res.redirect('/admin/dashboard')
                }
            }else{
                res.render('Adminlogin',{message:"Invalid email and password",resolve:false})
            }
        }else{
            res.render('Adminlogin',{message:"Invalid email and password",resolve:false})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadAdminDashboard = async (req,res) => {
    try {
        res.render('adminDash')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadLogin,
    verifyAdminLogin,
    loadAdminDashboard
}