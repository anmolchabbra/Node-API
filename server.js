const express = require('express')
const app = express()

app.listen(3000, ()=> {
    console.log('Node API is ruuning on port 3000')
})
//Declare Route
//We can even declare multiple routes as well
app.get('/', (req, res) => {
    res.send("Hello Node API")
})