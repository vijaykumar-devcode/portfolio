import express from 'express';
import jwt from 'jsonwebtoken';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import type { AuthRequest } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
import type { IUser } from '../models/User.js';

const router = express.Router();

// Optional auth middleware — attaches admin user if logged in
const optionalAuth = async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies?.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      const user = await User.findById(decoded.userId).select('-passwordHash');
      if (user) {
        req.user = user as IUser;
      }
    } catch {
      // no-op — unauthenticated is fine for public routes
    }
  }
  next();
};

router.route('/')
  .get(optionalAuth, getBlogs)
  .post(protect, admin, createBlog);

router.route('/slug/:slug').get(optionalAuth, getBlogBySlug);

router.route('/:id')
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;

