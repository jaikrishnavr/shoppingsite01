import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';



//@desc create new order
//@route Post/api/orders
//@access private 

const addOrderItems = asyncHandler (async(req, res) => {
   res.send('add order items');
});


//@desc get logged in users orders
//@route Get /api/orders/myOrders
//@access private 

const getMyOrders = asyncHandler (async(req, res) => {
    res.send('get my orders');
 });

 //@desc get order by Id
//@route GET /api/orders/:id
//@access private 

const getOrderById = asyncHandler (async(req, res) => {
    res.send('get order by id');
 });

 //@desc update order to paid
//@route GET /api/orders/:id/pay
//@access private 

const updateOrderToPaid  = asyncHandler (async(req, res) => {
    res.send('update order to paid');
 });


 //@desc update order to derivered
//@route GET /api/orders/:id/derivered
//@access private 

const updateOrderToDelivered = asyncHandler (async(req, res) => {
    res.send('update order to delivered');
 });

 //@desc get all orders
//@route Post/api/orders
//@access private 

const getOrders = asyncHandler (async(req, res) => {
    res.send('get all orders');
 });


 export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
 }

