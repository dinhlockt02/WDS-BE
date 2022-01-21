const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check } = require("prettier");
const db = require("../../../db.json");



module.exports = {
    
    login: async (body) => {
        const {email, password: plainPassword} = body;
        const checkUser = db.users.filter(user => user.email === email );


        // ktra trong db nếu có 1 email bằng vs email login 
        if(checkUser.length === 1){
            const compare = await bcrypt.compare(plainPassword, checkUser[0].password);
            // compare {result, err}
            if(compare.err){
                return {
                    error: true,
                    msg: err
                };
            }
            const accessToken = jwt.sign({email: checkUser[0].email}, "secret");
            const refeshToken = jwt.sign(
                {
                    email: checkUser[0].email, 
                    accessToken: accessToken

                }, "secret"
            );

            if(compare){
                return {
                    error: false,
                    msg: "Dang nhap thanh cong.",
                    token: {
                        accessToken,
                        refeshToken
                    }
                };
            }

            
                return{
                    error: true,
                    msg: "Email hoac Password bi sai."
                };
            
        }

        if(checkUser.length >1){
            return{
                error: true,
                msg: "Email bi trung."
            };
        }
        
            return{
                error: true,
                msg: "Tai khoang khong ton tai."
            };
        
    }
}