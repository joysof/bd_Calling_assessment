const mongoose = require('mongoose')

const todoSchema =new mongoose.Schema ({
    title :{
        type:String,
        required: true
    },
    description : {
        type:String,
        default: ''
    },
    priority : {
        type:String,
        enum : ['Low' , 'Medium' , 'High'] ,default:'Low'
    },
    dueDate : {
        type:Date
    },
    owner :{
        type: mongoose.Schema.Types.ObjectId,ref:'User' ,required : true
    },
    isCompleted :{
        type:Boolean,
        default:false
    },
    
},{timestamps: true})


const Todo = mongoose.models.Todo || mongoose.model('Todo' , todoSchema)
module.exports  =Todo