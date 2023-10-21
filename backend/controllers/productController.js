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

//@desc create a products
//@route POST /api/products
//@access private/admin 


// to get all products
const createProduct = asyncHandler (async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user.id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews:0,
        description:'Sample Description',
    })

    const createdProduct =  await product.save();
    res.status(201).json(createdProduct);
});



export { getProducts, getProductById, createProduct }; 