// isAdmin logedIn or not checking middleware
const isLogin = async(req,res,next) => {
    try {
        if(req.session.userId){

        }else{
          return res.redirect('/admin')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}
// isAdmin logedout or not checking middleware
const isLogout = async(req,res,next) => {
    try {
        if(req.session.userId){
           return res.redirect('/admin/dashboard')
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

//Exporting Middlewares
module.exports = {
    isLogin,
    isLogout
}