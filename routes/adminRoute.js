const express = require('express')
const adminController = require('../controllers/adminController')
const session = require('express-session')
const adminRouter = express.Router()
const auth = require('../middleware/adminAuth')
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

adminRouter.get('/',auth.isLogout,adminController.loadLogin)
adminRouter.post('/',adminController.verifyAdminLogin)
adminRouter.get('/dashboard',auth.isLogin,adminController.loadAdminDashboard)
adminRouter.get('/logout',auth.isLogin,adminController.adminLogout)
adminRouter.get('/adminpanel',auth.isLogin,adminController.adminpanel)
adminRouter.get('*',(req,res)=>{
    res.redirect('/admin')
})


module.exports = adminRouter