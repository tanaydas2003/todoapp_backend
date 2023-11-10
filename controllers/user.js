const User = require("../models/user");

const getAllUsers =  async (req,res) =>{
    // const users =await User.find({});
    const users = await User.find({});
    const keyword = req.query.keyword;
    console.log(keyword);

    res.json({
        success:true,
        users,
    });
}
// const register =  async (req,res) =>{

//     await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//     });
//     res.status(201).cookie("tempi","lol").json({
//         success: true,
//         message: "Registered Successfully",
//     });
// }
// const special = (req,res) =>{
//     res.json({
//         success:true,
//         message:"Just Joking"
//     })
// }
// const getUserDetails = async (req,res)=>{
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         user,
//     });
// }
module.exports = getAllUsers;
// module.exports = {getAllUsers,register,special,getUserDetails};
// module.exports = register;
// module.exports = special;
// module.exports = getUserDetails;