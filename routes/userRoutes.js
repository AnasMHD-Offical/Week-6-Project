const express = require('express')
const userController = require('../controllers/userController')
const session = require('express-session')
const auth = require('../middleware/auth')
const control = express()
const router = express.Router()

// path for views
control.set('view engine','ejs')
control.set('views','./users')

control.use(express.json())
control.use(express.urlencoded({extended:true}))
control.use(express.static('public/images'))

//user Register Route
router.get('/register',auth.islogout,userController.loadRegister)
router.post('/register',userController.insertUser)

//Home Route
router.get('/',auth.islogout,userController.loginLoad)
router.post('/',userController.verifyLogin)

//Login route
router.get('/login',auth.islogout,userController.loginLoad)
router.post('/login',userController.verifyLogin)

//Dashbord Route
router.get('/dashboard',auth.islogin,userController.renderDashboard)

//Logout route
router.get('/logout',auth.islogin,userController.userLogout)

module.exports = router