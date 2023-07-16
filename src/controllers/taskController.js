const Task = require('../models/taskModel')

const getTasks = async (req,res) =>{
try {const tasks = await Task.find({
    user: req.user.id
}).populate('user')
res.json(tasks)
}catch(error) {
    return res.status(500).json({message: 'something went wrong'})
}
}

const createTasks = async (req,res) =>{
 try {
    const {title,description, date} = req.body;
    const newTask = new Task({
         title,
         description,
         date,
         user: req.user.id
     })
   
    const savedTask =  await newTask.save();
    res.json(savedTask);
 } catch (error) {
    return res.status(500).json({message: 'something went wrong'})
 }
}

const getTask = async (req,res) =>{
try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({message:'Task not found'});
    res.json(task);
} catch(error) {
    return res.status(404).json({message:'Task not found'});
}
}

const deleteTask = async (req,res) =>{
try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({message:'Task not found'});
    return res.sendStatus(204);
} catch(error) {
    return res.status(404).json({message:'Task not found'});
}
}
const updateTask = async (req,res) =>{
    //mongoose cuando actualiza devuelve dato viejo, para que devuelva el actualizado,
    //tengo que poner el {new:true}
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!task) return res.status(404).json({message:'Task not found'});
    res.json(task)
    } catch(error) {
        return res.status(404).json({message:'Task not found'});
    }
}

module.exports = {getTask, getTasks, createTasks, updateTask,deleteTask}