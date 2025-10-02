const express = require('express')
const { register, getCurrentUser } = require('../controller/user.controller')
const userRouter = express.Router()


userRouter.post('/register' , register)
userRouter.post('/login' , loginUser)


userRouter.gat('/me' ,getCurrentUser)
userRouter.put('/profile' ,updateProfile)
userRouter.put('/password' ,updatePassword)