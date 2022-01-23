const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const customValidator = require('../validations');
const User = require('../models/user');
const AppError = require('../../common/errors/AppError');
const {sendResetLink} = require('../../common/Emails/sendEmail');
const {v4: uuidv4} = require('uuid');

module.exports = {
  login: async body => {
    const {email, password} = body;

    const checkUser = await User.findOne({email});

    if (checkUser) {
      const compare = await bcrypt.compare(password, checkUser.password);
      if (compare.err) {
        throw new AppError(500, err);
      }

      const accessToken = jwt.sign({userID: checkUser._id}, 'secret', {expiresIn: '2h'});
      const refeshToken = jwt.sign(
        {
          userID: checkUser._id,
          accessToken,
        },
        'secret',
        {expiresIn: '4h'}
      );

      if (compare) {
        return {
          msg: 'Login success.',
          name: checkUser.name,
          role: checkUser.role,
          token: {
            accessToken,
            refeshToken,
          },
        };
      }
      throw new AppError(401, 'Email or Password is incorrect.');
    }

    throw new AppError(401, "Account doesn't exist.");
  },

  isSignupDataValid: ({name, email, password}) => {
    customValidator.isName(name);
    customValidator.isEmail(email);
    customValidator.isPassword(password);
  },
  createUser: async ({name, email, password}) => {
    const existUser = await User.findOne({email});
    if (existUser) {
      throw new AppError(409, 'User exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({name, email, password: hashedPassword, role: 'user', cart: []});
    const userDoc = await user.save();
    return userDoc;
  },
  
  forgetPassword: async ({ email, userId }) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return next(new AppError('User with that email doesnt exist'))
    }
    try {
      let info = await sendResetLink(email, userId, uuidv4());
  
      return {
        statusCode: 200,
        messageId: info.messageId,
        msg: 'Send success',
      };
    } catch (err) {
      throw new AppError(500, err.message);
    }
  },
};

