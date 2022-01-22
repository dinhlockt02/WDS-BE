const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require("../../../db.json");
const customValidator = require('../validations');
const User = require('../models/user');
const AppError = require('../../common/errors/AppError');
const { check } = require("prettier");
const { append } = require("express/lib/response");






module.exports = {
    

    login: async (body) => {
        const {email, password} = body;
        
        
        const checkUser = await User.findOne({email});

        if(checkUser){
            const compare = await bcrypt.compare(password, checkUser.password);
            if(compare.err){
                throw new AppError(500,err);
            }
            
            const accessToken = jwt.sign({userID: checkUser.email}, "secret");
            const refeshToken = jwt.sign(
                {
                    userID: checkUser.email,
                    accessToken: accessToken
                }, "secret"
            );

            if(compare){
                return {
                    msg: "Login success.",
                    token: {
                        accessToken,
                        refeshToken
                    }
                };
            }
            throw new AppError(401,"Email or Password is incorrect.");
        }
        
            throw new AppError(401,"Account doesn't exist.");
        
    },   






  isSignupDataValid: ({name, email, password}) => {
    customValidator.isName(name);
    customValidator.isEmail(email);
    customValidator.isPassword(password);
  },
  createUser: async ({name, email, password}) => {
    const existUser = await User.findOne({email});
    if (existUser) {
      throw new AppError(201, 'User exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({name, email, password: hashedPassword, role: 'user'});
    const userDoc = await user.save();
    return userDoc;
  },
}
