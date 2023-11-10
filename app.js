const express =require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const dotenv =  require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

dotenv.config({
    path:"./data/config.env",
});

//Using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

//Using routes 
app.use("/api/v1/users" ,userRouter);
app.use("/api/v1/task" ,taskRouter);

// mongoose.connect("mongodb://localhost:27017",{
//     dbName:"backendapi",
// })
//     .then(() => console.log("database connected"))
//     .catch((e) => console.log(e));

// const schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });

// const User = mongoose.model("User",schema);

app.get("/", (req,res) =>{
    res.send("Working");
});

//Using Error Middleware
app.use(errorMiddleware);

// app.get("/users/all", async (req,res) =>{
//     const users =await User.find({});

//     res.json({
//         success:true,
//         users,
//     });
// });
// app.get("/userid/special", (req,res) =>{
//     res.json({
//         success:true,
//         message:"Just Joking"
//     })
// });
// app.get("/userid/:id", async (req,res)=>{
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         user,
//     });
// });
// app.post("/users/new", async (req,res) =>{

//     // const { name,email,password } = req.body;
//     var userData = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     }
//     var data = await User.create(userData);
//     res.status(201).send(data);
//     // res.json({
//     //     success:true,
//     //     message:"Registered Successfully",
//     // });
// });

app.listen(4000, ()=>{
    console.log("Server is working");
});
module.exports = express;