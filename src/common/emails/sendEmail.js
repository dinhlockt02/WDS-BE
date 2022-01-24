const nodemailer = require('nodemailer');
const ResetToken = require('../../api/models/reset_token');




let tokens = await ResetToken.findOne({userID});

if(!tokens){
    const resettoken = new ResetToken({userID, token });
}

// export module