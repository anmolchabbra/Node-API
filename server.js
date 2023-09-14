const express = require('express')
const mongoose = require('mongoose')
const app = express()



mongoose.connect('mongodb+srv://admin:hFCAcMNKUXa1ij7u@curd-api.wjvox3l.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API is ruuning on port 3000')
    })
}).catch(() => {
    console.log(error)
})
//Declare Route
//We can even declare multiple routes as well
app.get('/', (req, res) => {
    res.send("Hello Node API")
})
app.get('/world', (req, res) => {
    res.send("Hello World")
})