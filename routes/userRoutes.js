const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const userExistAuth = require('../middleware/userExistAuth')
const control = express()
const router = express.Router()
const nocache = require('nocache')
control.use(nocache())

control.use(express.json())
control.use(express.urlencoded({extended:true}))
control.use(express.static('public/images'))

//user Register Route
router.get('/register',auth.islogout,userController.loadRegister)
router.post('/register',userExistAuth.isUserExisting,userController.insertUser)

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

// router.get('*', (req, res) => {
//     res.redirect('/dashboard')
// })

//Exporting Routes
module.exports = router