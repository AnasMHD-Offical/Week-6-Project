const express = require('express')
const adminController = require('../controllers/adminController')
const session = require('express-session')
const adminRouter = express.Router()
const control = express()

control.set('view engine','ejs')
control.set('views','./admin')
// //Defining session
// control.use(session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true
// }))
control.use(express.json())
control.use(express.urlencoded({extended:true}))

adminRouter.get('/',adminController.loadLogin)
adminRouter.post('/',adminController.verifyAdminLogin)
adminRouter.get('/dashboard',adminController.loadAdminDashboard)
adminRouter.get('*',(req,res)=>{
    res.redirect('/admin')
})


module.exports = adminRouter