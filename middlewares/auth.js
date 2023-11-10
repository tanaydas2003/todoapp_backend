const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated =  async (req,res,next) =>{
    const {token} = req.cookies;
    if(!token) return res.status(404).json({
        success:false,
        message:"Login First",
    });
    const decoded = jwt.verify(token,"trial");
    req.user = await User.findById(decoded._id);
    next();
};

module.exports = isAuthenticated;