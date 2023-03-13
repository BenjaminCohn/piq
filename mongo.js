//Database
const mongoose = require('mongoose');
const password = "WdQGxlWFyHj6x4Wb"
const uri = `mongodb+srv://benjamincohen:${password}@cluster0.0ipl6be.mongodb.net/?retryWrites=true&w=majority`;


mongoose
.connect(uri)
.then((() => console.log("Connected to Mongo")))
.catch((err) => console.err("Error to connecting to Mongo", err))

const userSchema = new mongoose.Schema({

    email: String,
    password: String
    
})

const User = mongoose.model("User", userSchema);

module.exports = {mongoose, User} 