

const Todo = require('../models/todo.model.js')


const createTodo = async (req,res) =>{
    try {
        const {title , description , priority ,dueDate,completed} = req.body;
        const todo = new Todo ({
            title,
            description,
            priority,
            dueDate,
            completed : completed ==='Yes' || completed === true,
           owner: req.user._id
        })
        const saved = await todo.save()
        return res.json({success : true , todo : saved})
    } catch (error) {
        return res.json({success : false , message : error.message})        
    }
}


// get all todo for user 

const getTodo = async(req,res) =>{
    try {
        const todos = await Todo.find({owner: req.user.id})
        .sort({createdAt : -1});
        return res.json({success : true , todos})
    } catch (error) {
        return res.json({success : false , message : error.message})
    }
}

// get single todo using todo id 

const getTodoById = async (req,res) =>{
    try {
        const todo = await Todo.findOne({id : req.params.id , owner : req.user.id})
        if (!todo) {
            return res.json({success : false , message : "todo not found "})    
        }
        res.json({success : true , todo})
    } catch (error) {
        return json({success : false , message : error.message})
    }
}

// update todo for user 

const updateTodo = async (req,res) =>{
    try {
        const data = {...req.body}
        if (data.completed !== undefined) {
           data.completed = data.completed === 'Yes'  ||data.completed === true 
        }
        const update = await Todo.findOneAndUpdate(
            {_id: req.params.id , owner : req.user.id},
            data,
            {new : true , runValidators : true}
        )
        if (!update) {
            return res.json({success : false , message :"Todo not found or not yours"})
        }
        res.json({success : true , todo: update})
    } catch (error) {
        return json({success : false , message : error.message})
    }
}

// delete todo 

const deleteTodo = async (req,res) =>{
  try {
    const deleted = await Todo.findOneAndDelete({_id: req.params.id , owner : req.user.id})
    if (!deleted) {
        return res.json({success : false , message : "Todo not found or not yours"})       
    }
    res.json({success : true , message :"todo deleted"})
  } catch (error) {
    return json({success : false , message : error.message})
  }
}

module.exports = {createTodo , getTodo , getTodoById , updateTodo , deleteTodo}