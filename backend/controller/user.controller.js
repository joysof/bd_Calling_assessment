const User = require("../models/user.model.js")
const bcrypt =require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const transporter = require('../config/nodemailer.js')

const JWT_SECRET = process.env.JWT_SECRET || "this_is_secret"
const TOKEN_EXPIRES = '24H'

const createToken = (userId) => jwt.sign({id : userId} , JWT_SECRET ,{expiresIn : TOKEN_EXPIRES})
// register user 

const register = async (req,res) =>{
    const {name , email , password} = req.body

    if (!name || !email || !password) {
        return res.json({success : false , message : "All fields are required"})        
    }
    if (!validator.isEmail(email)) {
        return res.json({success : false , message : "Invalied email"})
    }
    if (password.length < 8) {
        return res.json({success : false , message : 'password must be atleast 8 characters'})        
    }

    try {
        if (await User.findOne({email})) {
           return res.json({success : false , message : "User alreay exists"}) 
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        const user = await User.create({name , email , password:hashedPassword})
        const token = createToken(user._id)

            // wellcome email send 
          const mailOptions = {
            from : process.env.SMTP_USER,
            to: email,
            subject : "welcome to our app",
            text : `welcome to our app your accoutn hasben create with email id ${email}`
            } 
           try {
            await transporter.sendMail(mailOptions);
            
            } catch (err) {
            console.error( err.message);
            }
        return res.json({
            success : true , token , user :{id : user._id , name : user.name , email : user.email}
        })
         
    } catch (error) {
        console.log(error)
        return res.json({success :false , message :error.message})
    }
}

// login function

const loginUser =async (req,res) =>{
    const {email , password} = req.body
    if (!email || !password) {
        return res.json({success : false , message : "email and password required"})       
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({success :false , message : "Invalid email or password"})
        }
        const match = await bcrypt.compare(password,user.password)
        if (!match) {
            return res.json({success : false , message :"Invalid email or password "})            
        }
        const token = createToken(user._id)
        return res.json({success : true ,message : "Login successful" , token , user : {id : user._id , name : user.name , email : user.email }})
    } catch (error) {
        console.log(error)
        return res.json({success :false , message :"Something went wrong, try again"})
    }
}

const getCurrentUser = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("name email")
        if (!user) {
            return res.json({success : false , message : "user not found"})           
        }
        return res.json({success :true , user})
    } catch (error) {
        console.log(error)
        return res.json({success :false , message :error.message})      
    }
}

const updateProfile = async(req,res) =>{
    const{name , email } = req.body
    if (!name || !email || !validator.isEmail(email)) {
        return res.json({success : false , message : "valid name and emai required"})
    }
    try {
        const exists = await User.findOne({email, _id : {$ne : req.user.id}})
        if (exists) {
            return res.json({success : false , message : " Email already in use by another account"})            
        }
        const user =await User.findByIdAndUpdate(
            req.body.id,
            {name , email},
            {new : true , runValidators:true , select :"name email"}
        )
        return res.json({success :true , user})
    } catch (error) {
        console.log(error)
        return res.json({success :false , message :error.message})
    }
}

// change password 

const updatePassword = async(req,res) =>{
    const {currentPassword , newpassword} = req.body
    if (!currentPassword ||!newpassword || newpassword.length < 8) {
        return res.json({success : false , message : "password incalid or short"})        
    }
    try {
        const user = await User.findById(req.user.id).select("password")
        if(!user){
            return res.json({success : false , message : "user not found "})
        }
        const match = await bcrypt.compare(currentPassword , user.password)
        if (!match) {
            return res.json({success : false , message :"incorrect password"})            
        }
        user.password = await bcrypt.hash(newpassword , 10)
        await user.save()
        return res.json({success : false ,message : "password change successful"})
    } catch (error) {
        console.log(error)
        return res.json({success :false , message :error.message})
    }
}

module.exports= {register ,loginUser ,getCurrentUser,updateProfile , updatePassword}