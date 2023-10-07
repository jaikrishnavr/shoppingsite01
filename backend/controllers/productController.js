import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";


//@desc Fetch all products
//@route Get all products
//@access public 


// to get all products
const getProducts = asyncHandler (async(req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//@desc Fetch a product
//@route Get /api/products/:id
//@access public

//to get a product by id
const getProductById = asyncHandler (async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
     res.json(product);
    }else{
     res.status(404);
     throw new Error('Resource not found');
    }
});


export { getProducts, getProductById }; 