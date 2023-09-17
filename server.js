//Requiremnets
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

//Connection to Database
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log('Node API is ruuning on port ${PORT}')
    })
}).catch((error) => {
    console.log(error)
})

//Get All Products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get Product from ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Add new Product
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


//Update a Product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //can't find a product in db
        if (!product) {
            return res.status(404).json({message: 'cannot find the product with ID', id})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        console.log(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Delete a Product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

