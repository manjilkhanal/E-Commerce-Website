const express =require("express")
const authRoutes =require("./auth")
const cmsRoutes = require("./cms")
const frontRoutes = require("./front")
const profileRoutes = require("./profile")
const {auth, adminStaff, customerOnly} = require("../lib")
const {Profile} = require('../controllers')
// const { customerOnly, auth } = require('../../lib')
//const { auth, adminStaff} = require("../lib")
//import * as Model from "../models/index.js"

const router = express.Router()

router.use('/auth',authRoutes)

router.use('/cms',auth,adminStaff,cmsRoutes)

router.use('/profile',auth,profileRoutes)

router.use('/checkout', auth, customerOnly, Profile.checkout)

router.get('/image/:filename', (req,res,next) => {
    res.sendFile(`uploads/${req.params.filename}`,{
        root: "../api"
    })
})

router.use(frontRoutes)

router.use((req, res,next) =>{
//res.status(404).json
    next({
    //error: 'Resource not found'
    message:'Resource not found',
    status: 404
})
})

module.exports = router