const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel  = require('../Models/Users')


const router = express.Router()

router.post('/register', async(req,res)=>{
    const {username, password} = req.body
    const user = await UserModel.findOne({ username });

    if(user){
        return res.json({message:'User Exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password:hashedPassword})

    await newUser.save()
    res.json({
        message:'User Saved Successfully'
    })
})


router.post('/login',async(req,res)=>{

    const {username, password} = req.body
    const user = await UserModel.findOne({username})

    if(!user){
        return res.json({message:'Username does not exist.'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.json({message:"Username or password is incorrect."})
    }

    const token = jwt.sign({id:user._id}, "secret")
    res.json({token, userID:user._id})
})


module.exports = router


const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, 'secret', (err)=>{
            if(err) res.status(403)
            next();
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = verifyToken