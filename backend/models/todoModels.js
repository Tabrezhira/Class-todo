const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title :{
        type: String,
        required:true,
        minlength: 5,
    },
    description : {
        type: String,
        required:true,
        minlength: 5,
    },
    
    priority : {
        type:String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    createdAT : {
        type: Date,
        default: Date.now,
    },
    
    updatedAT : {
        type: Date,
        default: Date.now,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    status:{
        type: String,
        enum: ['Pending', 'Completed', 'in-progress'],
        default: 'Pending',
    },

    dueDate:{
        type: Date,
        default:null
    },
    
    repeated:{
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly',"none"],
        default: 'none',

    },
        
    repeatedStartdate:{
        type: Date,
        default: null,
    },
        
    repeatedEnddate:{
        type: Date,
        default: null,
    }

})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;