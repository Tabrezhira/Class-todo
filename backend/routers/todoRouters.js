const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModels')
const User = require('../models/userModels')

//created todo
//updated todo
//deleted todo
//read todo
// get all

router.post('/createtodo/:id',async(req,res)=>{
    try {
            const userId = req.params.id
            if(!userId){
                return res.status(400).json({message: 'All input required'})
            }
            const {title,description,priority,status,dueDate,repeated,repeatedStartdate,repeatedEnddate} = req.body;
        
            if(!title || !description ){
                return res.status(400).json({message: 'All input required'})
            }
        
            const newTodo = new Todo({title,description,priority,status,dueDate,repeated,repeatedStartdate,repeatedEnddate,user:userId});
            await newTodo.save();
            res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/updatedTodo/:id',async(req,res)=>{
    try {
            const todoId = req.params.id
            const {title,description,priority,status,dueDate,repeated,repeatedStartdate,repeatedEnddate} = req.body;
        
            if(!title || !description ){
                return res.status(400).json({message: 'All input required'})
            }
        
            const todo = await Todo.findByIdAndUpdate(todoId, {title,description,priority,status,dueDate,repeated,repeatedStartdate,repeatedEnddate})
        
            res.status(201).json(todo)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete/:id', async(req,res) => {
    try {
            const todoId = req.params.id
            if(!todoId){
                return res.status(400).json({message: 'All input required'})
            }
        
            const todo = await Todo.findByIdAndDelete(todoId)
            res.status(201).json(todo) 
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/todolist/:id', async(req,res) => {
    try {
            const userId = req.params.id
            if(!userId){
                return res.status(400).json({message: 'All input required'})
            }
            const todolist = await Todo.find({user:userId})
        
            if(!todolist){
                return res.status(400).json({message: 'No todo found'})
            }
            res.status(201).json(todolist) 
    } catch (error) {
        res.status(500).json(error) 
    }

})






module.exports = router