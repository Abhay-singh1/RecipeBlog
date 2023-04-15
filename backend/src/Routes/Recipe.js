const RecipeModel = require('../Models/Recipe') 
const UserModel = require('../Models/Users') 
const express = require('express')
const mongoose = require('mongoose')
const verifyToken = require('./users')

const router = express()

router.get('/', async(req,res)=>{
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (err) {
        console.error(err)
    }
})


router.post('/', verifyToken, async(req, res)=>{
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (err) {
        console.error(err)
    }
})


router.put('/', verifyToken, async(req,res)=>{
    
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe)
        await user.save()
        res.json({savedRecipes: user.savedRecipes})
    } catch (err) {
        console.error(err)
    }
})


router.get('/savedrecipes/ids/:userID', async(req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})
    } catch (err) {
        console.error(err)
    }
})
router.get('/savedrecipes/:userID', verifyToken, async(req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({savedRecipes})
    } catch (err) {
        console.error(err)
    }
})

module.exports = router