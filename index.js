const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());

const book = require('./schema.js');




app.get("/", (req, res)=>{
    res.send("This is the backend of the book details");

})

app.post("/post", async(req,res)=>{
    try {
        const{title, author, genre, publishedYear, availableCopies} = req.body;
    if(!title || !author || !genre || !availableCopies){
        return res.status(400).json({message:"Please fill all the fields"});
    }

    const postedData = await book.insertOne({title, author, genre, publishedYear, availableCopies});
    postedData.save();
    return res.status(200).json({message:"Book added successfully"});

    } catch (error) {
        return res.status(500).send({message:"Internal server error"});
    }
});



app.get("/get", async(req, res)=>{
    try {
        

        const getBook = await book.find();
        return res.status(200).send({message:"Book details fetched successfully", getBook});
        
    } catch (error) {
        return res.status(500).send({message:"Internal server error"});
    }
});


app.put("/update/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:"Please provide the id"});
        }

        const{title, author, genre, publishedYear, availableCopies} = req.body;
        if(!title || !author || !genre || !availableCopies){
            return res.status(400).json({message:"Please fill all the fields", });
        }

        const updateBook = await book.findByIdAndUpdate({_id:id},{title, author, genre, publishedYear, availableCopies});
        if(!updateBook){
            return res.status(404).send({message:"Book not found in the details"});
        }


        return res.status(200).send({message:"Book details updated successfully", updateBook});
        
    } catch (error) {
        return res.status(500).send({message:"Internal server error"});
    }
});

app.delete("/delete/:id", async(req,res)=>{
   try {
    const {id} = req.params;
        if(!id){
            return res.status(400).json({message:"Please provide the id"});
        }

        const deleteBook = await book.findByIdAndDelete({_id:id});
        if(!deleteBook){
            return res.status(404).send({message:"Book not found in the details"});
        }
    
   } catch (error) {
    return res.status(500).send({message:"Internal server error"});
   }
})

mongoose.connect(process.env.MONGODB_URI);
app.listen(8080,()=>{
    console.log("Server is running on port 8080");

});

