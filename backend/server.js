const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 4000
const connectDB = require("./config/db.js")

// mideleware 
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))

connectDB()


app.get('/' ,(req ,res) =>{
    res.send("api working")
})

app.listen(port , () =>{
    console.log(`server started on http://localhost:${port}`)
})