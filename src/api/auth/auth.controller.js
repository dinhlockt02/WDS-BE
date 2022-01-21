const authService = require("./auth.service");

module.exports = {
  
  login: async (req, res) => {
    let DTO = await authService.login(req.body);
    
    
    if(DTO.error){
        res.status(500).json(DTO.msg);
        return;
    }
    
    
    res.status(200).json({
      message: DTO.msg,
      token: DTO.token
    });
  },
  signup: async (req, res) => {
    res.status(201).json({
      message: 'Signup successful',
    });
  },
};
