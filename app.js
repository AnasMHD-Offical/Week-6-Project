require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const userRoutes = require('./routes/userRoutes')
const AdminRoutes = require('./routes/adminRoute')
const ejs = require('ejs')
const app = express()
const PORT = process.env.PORT || 3000

//connecting DB
mongoose.connect(process.env.MONGODB_URI)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Defining session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'))

//Template engine
app.set('view engine', 'ejs')

// path for views
app.set('views', './views/body')

//User Route setting
app.use('/', userRoutes)

//Admin Route setting
app.use('/admin', AdminRoutes)


//Listening the server
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`))

