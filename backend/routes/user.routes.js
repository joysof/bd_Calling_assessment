const express = require('express')
const { register, getCurrentUser ,loginUser  , updatePassword,updateProfile } = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware.js')


const userRouter = express.Router()


userRouter.post('/register' , register)
userRouter.post('/login' , loginUser)


userRouter.get('/me',authMiddleware ,getCurrentUser)
userRouter.put('/profile',authMiddleware ,updateProfile)
userRouter.put('/password',authMiddleware ,updatePassword)

module.exports = userRouter