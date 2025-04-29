const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number,
    },
    availableCopies:{
        type:Number,
        required:true
    }
   
})

const book = mongoose.model('Book', schema);
module.exports = book;