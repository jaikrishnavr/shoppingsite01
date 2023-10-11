import asyncHandler from "../middleware/asyncHandler.js"

//@desc Auth user & get token
//@route post /api/users/login
//@access public 
const authUser = asyncHandler (async(req, res) => {
    res.send('auth.user');
});

//@desc  Regester user  & get token
//@route post /api/users/login
//@access public 
const registerUser = asyncHandler (async(req, res) => {
    res.send('register.user');
});

//@desc  Logout user / clear cookies
//@route post /api/users/logout
//@access private 
const logoutUser = asyncHandler (async(req, res) => {
    res.send('logout.user');
});

//@desc  get user profile
//@route Get/api/users/profile
//@access private  
const getUserProfile = asyncHandler (async(req, res) => {
    res.send('get user profile');
});


//@desc  Update user profile
//@route Put/api/users/profile
//@access private/Admin 
const updateUserProfile = asyncHandler (async(req, res) => {
    res.send('update user profile');
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