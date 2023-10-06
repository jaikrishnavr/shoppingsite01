import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

//to get all the products
router.get('/',  asyncHandler(async(req, res) => {
  const products = await Product.find({});
  res.json(products);
}));

//to get only one product
router.get('/:id', asyncHandler(async(req, res) => {
 const product = await Product.findById(req.params.id);
 if(product) {
  res.json(product);
 }
  res.status(404).json({message:'Product Not Found'});
}));

export default router;
