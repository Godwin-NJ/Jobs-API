const User = require('../models/User')
const {StatusCodes}= require('http-status-codes') ;
const {BadRequestError,UnauthenticatedError} = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const register = async(req,res) => {
    const user = await User.create({...req.body})
    // const token = jwt.sign({userID:user._id, name:user.name}, "jwtSecret",{expiresIn:"30d"})
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).send({user:{name:user.name},token})
}       

const login = async(req,res) => {
    const{email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const token = user.createJwt()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})


}


module.exports = {
    register,
    login
}


