const express = require("express"); 
const bcrypt = require("bcrypt");
const router = express.Router();

const getAllUsers = require("../controllers/user");
const connectDB = require("../data/database");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features");
const isAuthenticated = require("../middlewares/auth");
// const register = require("../controllers/user");
// const special = require("../controllers/user");
// const getUserDetails = require("../controllers/user");

connectDB();
router.get("/all", getAllUsers);
router.post("/new",  async (req,res) =>{
    const { name,email,password } = req.body;
    let user =  await User.findOne({email});
    if(user) return res.status(404).json({
        success:false,
        message:"User Already Exist",
    });
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name:name ,
        email:email, 
        password:hashedPassword,
    });
    sendCookie(user,res,"Registered Successfully",201);
});
router.post("/login", async (req,res,next) =>{
    const {email, password} = req.body;
    const user =  await User.findOne({email}).select("+password");
    if(!user) return res.status(404).json({
        success:false,
        message:"Invalid Email or password",
    });
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(404).json({
        success:false,
        message:"Invalid Email or password",
    });
    sendCookie(user,res,`Welcome Back, ${user.name}`, 200);
});
router.get("/logout", async(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV=== "Development" ? false : true,
    })
    .json({
        success:"true",
        message:"Logout Successfully",
    });
});
router.get("/userid/special", (req,res) =>{
    res.json({
        success:true,
        message:"Just Joking"
    })
});
router.get("/me",isAuthenticated, (req,res)=>{

    res.status(200).json({
        success:"true",
        user:req.user,
    });
});

module.exports = router;