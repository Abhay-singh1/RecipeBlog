const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require("./src/Routes/users")
const recipeRouter = require("./src/Routes/Recipe")
const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)
app.use('/recipes', recipeRouter)

mongoose.connect("mongodb+srv://Abhay1:Abhay1@cluster0.z3xw7.mongodb.net/recipes?retryWrites=true&w=majority")
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log('Server started at 8000')
})
