import express from 'express';
import products from './data/products.js';

import dotenv from 'dotenv';
dotenv.config();
const Port = process.env.PORT || 5000;

const app = express();

app.get('/',(req,res) => {
    res.send('Api is running...');
});

//to get all the products
app.get('/api/products',(req,res) => {
res.json(products);
});

//to get only one product
app.get('/api/products/:id', (req,res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
    });

app.listen(Port,()=> console.log(`server listening on port ${Port}`));