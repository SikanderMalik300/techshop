import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authentication * get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin 
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

// @desc Register User
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User Already Existed')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

// @desc Logout User & clear Cookie
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires : new Date(0)
    });

    res.status(200).json({ message : 'Logged Out Successfully'})
})

// @desc Get user profile
// @route Get /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
         res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error("User not Found")
    }
})

// @desc update user profile
// @route Put /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save()
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error("user not found")
    }
})

// @desc get users
// @route Get /api/users
// @access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
})

// @desc get user by id
// @route Get /api/users/:id
// @access Private/Admin

const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id')
})


// @desc delete user
// @route Delete /api/users/:id
// @access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})

// @desc update user
// @route Put /api/users/:id
// @access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserByID
}