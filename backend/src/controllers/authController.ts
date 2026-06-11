import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import type { AuthRequest } from '../middlewares/authMiddleware.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id as string);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(401);
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {},
  });
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          _id: user._id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
