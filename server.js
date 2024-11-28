require('dotenv').config();  // Ensure dotenv is properly initialized
const express = require('express')
const mongoose = require('mongoose')

const User = require("./models/userModel")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
    res.send('Hello King!..')
})

app.get('/blogs', (req, res) => {
    res.send('This is our Blogs Page')
})


// GET All Users
app.get("/usersinfo", async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
})

// GET User by ID
app.get("/userinfo/:id", async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update User by ID
app.put("/userinfo/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            return res.status(404).json({message:`Cannot Find an User in a DataBase with and ID ${id}`})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete User by ID
app.delete("/userinfo/:id", async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user){
            return res.status(404).json({message:`Cannot Find an User in a DataBase with and ID ${id}`})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Add Users
app.post('/createuser', async(req, res) => {
    try {
        const users = await User.create(req.body)
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})



mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DataBase Connected Successfully");
    app.listen(3000, () => {
        console.log('Node App running on LocalHost 3000');
    })
}).catch((error) => {
    console.log(error);
})


