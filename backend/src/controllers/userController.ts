import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

// @desc    Get public profile info (like cvUrl)
// @route   GET /api/users/profile
// @access  Public
export const getPublicProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We only have one admin user in this portfolio setup.
    const adminUser = await User.findOne({ role: 'admin' }).select('cvData');
    
    res.status(200).json({
      success: true,
      data: adminUser ? { cvUrl: adminUser.cvData ? '/api/users/cv' : '' } : null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile info (like cvUrl)
// @route   PUT /api/users/profile
// @access  Private/Admin
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    // We assume req.user is set by the protect middleware
    const user = await User.findById((req as any).user._id);
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    if (username) user.username = username;
    if (password) user.passwordHash = password; // passwordHash will be hashed by pre-save hook
    
    const updatedUser = await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download CV file
// @route   GET /api/users/cv
// @access  Public
export const downloadCV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminUser = await User.findOne({ role: 'admin' }).select('cvData cvContentType');
    
    if (!adminUser || !adminUser.cvData) {
      res.status(404);
      throw new Error('CV not found');
    }

    res.set('Content-Type', adminUser.cvContentType || 'application/pdf');
    res.set('Content-Disposition', 'inline; filename="resume"');
    res.send(adminUser.cvData);
  } catch (error) {
    next(error);
  }
};
