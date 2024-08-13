// user login or not checking 
const islogin = async (req, res, next) => {
    try {
        if (req.session.userId) {

        } else {
           return res.redirect("/")
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}

// user logout or not checking 
const islogout = async (req, res, next) => {
    try {
        if (req.session.userId) {
           return res.redirect('/dashboard')
        }
        next()
    } catch (error) {
        console.log(error.message);

    }
}

// Exporting middlewares
module.exports = {
    islogin,
    islogout
}