const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')


const loadLogin = async (req, res) => {
    try {
        res.render('Adminlogin', { message: "Welcome to admin Login", resolve: true })
    } catch (error) {
        console.log(error.message);

    }
}

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

const adminLogout = async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/admin')
    } catch (error) {
        console.log(error.message);

    }
}

const adminpanel = async (req, res) => {
    try {
        res.render('adminpannel')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadLogin,
    verifyAdminLogin,
    loadAdminDashboard,
    adminLogout,
    adminpanel
}