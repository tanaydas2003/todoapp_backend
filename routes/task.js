const express = require("express");
const newTask = require("../controllers/task.js");
const isAuthenticated = require("../middlewares/auth");
// const getMyTask = require("../controllers/TASK.JS");
const Task = require("../models/task");
// const updateTask = require("../controllers/update");
const router = express.Router();

router.post("/new",isAuthenticated, newTask);
router.get("/my",isAuthenticated, async(req,res,next)=>{
    const userId  = req.user._id;
    const tasks = await Task.find({user:userId});
    res.json({
        success:true,
        tasks,
    })
});
router.put("/:id",isAuthenticated,async(req,res,next)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task)
        return next(new Error("Invalid Id")); // 1 liner code if you enter invalid id in app.use in bottom for both delete and update
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success:"true",
        message:"Updated Successfully",
    });
});
router.delete("/:id",isAuthenticated,async(req,res,next) =>{
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task)
        return next(new Error("Invalid Id"));
    await task.deleteOne();
    res.status(200).json({
        success:"true",
        message:"Deleted Successfully",
    });
});


module.exports = router;