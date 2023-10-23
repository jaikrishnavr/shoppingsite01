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

//@desc Update a products
//@route Put /api/products/:id
//@access Private/admin
const updateProduct = asyncHandler (async(req, res) => {
    const { name, price, description, brand ,category, countInStock, image } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name= name;
        product.price=price;
        product.description= description;
        product.image = image;
        product.brand = brand; 
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Resources not found');
    }
});

//@desc Delete a products
//@route DELETE /api/products/:id
//@access Private/admin
const deleteProduct = asyncHandler (async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
      await Product.deleteOne({_id: product._id});
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(404);
        throw new Error('Resources not found');
    }
});




export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, }; 