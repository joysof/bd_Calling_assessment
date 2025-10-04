const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 4000
const connectDB = require("./config/db.js")
const userRouter = require("./routes/user.routes.js")
const todoRouter = require("./routes/todo.routes.js")

// mideleware 
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true               
}));
connectDB()

// defualt route 
app.get('/' ,(req ,res) =>{
    res.send("api working")
})

// api end point 
app.use('/api/user',userRouter)
app.use('/api/todo' ,todoRouter)

app.listen(port , () =>{
    console.log(`server started on http://localhost:${port}`)
})