const Task = require("../models/task");

const newTask = async(req,res,next)=>{
    const {title,description} = req.body;
    await Task.create({
        title,
        description,
        user:req.user,
    });

    res.status(201).json({
        success:"true",
        message:"Task added Successfully"
    })
};
// const updateTask = async(req,res,next)=>{
//         const {id} = req.params;
//         const task = await Task.findById(id);
//         if(!task)
//             return res.status(404).json({
//                         success:"false",
//                         message:"Invalid Id",
//                     });
//         task.isCompleted = !task.isCompleted;
//         await task.save();
//         res.status(200).json({
//             success:"true",
//             message:"Updated Successfully",
//         });
// };
// module.exports = updateTask;

// const getMyTask = async(req,res,next)=>{
//     const userId  = req.user._id;
//     const tasks = await Task.find({user:userId});
//     res.json({
//         success:true,
//         tasks,
//     })
// };

module.exports = newTask;