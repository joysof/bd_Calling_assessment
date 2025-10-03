const mongoose = require('mongoose')

const todoSchema = ({
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
        enum : ['Low' , 'medium' , 'High'] ,default:'Low'
    },
    dueDate : {
        type:Date
    },
    ownder :{
        type: mongoose.Schema.Types.ObjectId,ref:'User' ,required : true
    },
    completed :{
        type:Boolean,
        default:false
    },
    createAt :{
        type: String,
        default : Date.now()
    }
})


const Todo = mongoose.models.Todo || mongoose.model('Todo' , todoSchema)
module.exports  =Todo