import express from 'express';
import jwt from 'jsonwebtoken';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, } from '../controllers/blogController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
const router = express.Router();
// Optional auth middleware — attaches admin user if logged in
const optionalAuth = async (req, res, next) => {
    const token = req.cookies?.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-passwordHash');
            if (user) {
                req.user = user;
            }
        }
        catch {
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
//# sourceMappingURL=blogRoutes.js.map