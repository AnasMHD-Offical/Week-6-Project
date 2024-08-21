const express = require('express')
const adminController = require('../controllers/adminController')
const adminRouter = express.Router()
const auth = require('../middleware/adminAuth')
const userExistAuth = require('../middleware/userExistAuth')
const control = express()
const nocache = require('nocache')
control.use(nocache())
// control.set('view engine', 'ejs')
// control.set('views', './admin')


control.use(express.json())
control.use(express.urlencoded({ extended: true }))

//admin login route
adminRouter.get('/',auth.isLogout, adminController.loadLogin)
adminRouter.post('/',adminController.verifyAdminLogin)

// admin dashboard route
adminRouter.get('/dashboard', auth.isLogin, adminController.loadAdminDashboard)

//admin logout route
adminRouter.get('/logout', auth.isLogin, adminController.adminLogout)

//admin admin-pannel route
adminRouter.get('/adminpanel', auth.isLogin, adminController.adminpanel)

// admin add new user routes
adminRouter.get('/add', auth.isLogin, adminController.addUser)
adminRouter.post('/add',userExistAuth.isAdminAddUserExisting,auth.isLogin, adminController.insertaddUser)

// admin user edit routes
adminRouter.get('/edit', auth.isLogin, adminController.editUser)
adminRouter.post('/edit',adminController.updateUser)

//admin user delete routes
adminRouter.get('/delete', adminController.deleteUser)

// admin user search route
adminRouter.post('/adminpanel',adminController.searchUser)

//all the other routes are redirected to the admin route
adminRouter.get('*', (req, res) => {
    res.redirect('/admin')
})

//Exporting Routes
module.exports = adminRouter