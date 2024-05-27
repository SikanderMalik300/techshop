import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    // Read the JWT from the cookie
    token = req.cookies.jwt;
    
    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and attach to request object, excluding the password
            req.user = await User.findById(decoded.userId).select('-password');
            
            // Call the next middleware
            next();
        } catch (error) {
            // If token verification fails, return an unauthorized error
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        // If no token is found, return an unauthorized error
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin middleware

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not authorized, as admin');
    }
}

export {admin, protect}