const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const { getTodo, createTodo, getTodoById, updateTodo, deleteTodo } = require('../controller/todo.controller')
const todoRouter = express.Router()


todoRouter.route('/')
.get(authMiddleware , getTodo)
.post(authMiddleware , createTodo)

todoRouter.route('/:id')
.get(authMiddleware ,getTodoById)
.put(authMiddleware , updateTodo)
.delete(authMiddleware ,deleteTodo)

module.exports = todoRouter
