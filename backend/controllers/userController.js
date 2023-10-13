import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js";
import jwt  from "jsonwebtoken";
import generatetoken from "../utils/generateToken.js";

//@desc Auth user & get token
//@route post /api/users/login
//@access public 
const authUser = asyncHandler (async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

if (user && (await user.matchPassword(password))) {
    generatetoken(res, user._id);

    res.status(200).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        //password:user.password,
        isAdmin:user.isAdmin,
    });
} else{
    res.status(401);
    throw new Error('Invalid email or password');
}
});

//@desc  Regester user  & get token
//@route post /api/users/login
//@access public 
const registerUser = asyncHandler (async(req, res) => {
    const {name , email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new console.error('User already exists');
    }

    const user =  await User.create({
        name,
        email,
        password
    });
     
    if(user) {
        generatetoken(res, user._id);

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            password:user.password,
            isAdmin: user.isAdmin,
        });

    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
});

//@desc  Logout user / clear cookies
//@route post /api/users/logout
//@access private 
const logoutUser = asyncHandler (async(req, res) => {
   res.cookie('jwt','',{
    httpOnly: true,
    expires: new Date(0),
   });

   res.status(200).json({ message: 'Logged out successfully'});
});

//@desc  get user profile
//@route Get/api/users/profile
//@access private  
const getUserProfile = asyncHandler (async(req, res) => {
 const user =  await User.findById(req.user._id);

 if(user) {
    res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            isAdmin:user.isAdmin,
    });
 } else{
    res.status(404);
    throw new Error('User not found');
 }
});


//@desc  Update user profile
//@route Put/api/users/profile
//@access private/Admin 
const updateUserProfile = asyncHandler (async(req, res) => {
    const user =  await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.isAdmin) {
            user.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
     }

});


//@desc  Get users
//@route GET/api/users
//@access private/Admin 
const getUsers = asyncHandler (async(req, res) => {
    res.send('get user');
});

//@desc  Get user by ID
//@route GET/api/users/:id
//@access private/Admin 
const getUserByID = asyncHandler (async(req, res) => {
    res.send('get user by ID');
});

//@desc  Delete user 
//@route DELETE/api/users/:id
//@access private/Admin 
const deleteUser = asyncHandler (async(req, res) => {
    res.send('Delete user');
});

//@desc  update user 
//@route Put/api/users/:id
//@access private/Admin 
const updateUser = asyncHandler (async(req, res) => {
    res.send('update user');
});


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
}