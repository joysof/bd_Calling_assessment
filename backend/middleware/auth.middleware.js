const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
const JWT_SECRET = process.env.JWT_SECRET || "this_is_secret"


const authMiddleware = async (req,res ,next)=>{

    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({ success: false, message: "Not authorized, login again" });
}
    const token = authHeader.split(" ")[1]; 


    try {
        const payload = jwt.verify(token , JWT_SECRET)
        const user = await User.findById(payload.id).select('-password')

        if(!user){
            return res.json({success : false , message :"user not found"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("jwt verification failed" ,error)
        return res.json({success : false , message :"Token invalid or expired"})
    }
}

module.exports = authMiddleware