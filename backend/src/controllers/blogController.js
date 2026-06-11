import Blog from '../models/Blog.js';
// @desc    Fetch all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
    try {
        // Only fetch published blogs for public API, or all if admin
        const query = req.user?.role === 'admin' ? {} : { isPublished: true };
        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            data: blogs,
        });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Fetch single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
    try {
        const query = { slug: req.params.slug };
        if (req.user?.role !== 'admin') {
            query.isPublished = true;
        }
        const blog = await Blog.findOne(query);
        if (blog) {
            res.status(200).json({
                success: true,
                message: 'Blog fetched successfully',
                data: blog,
            });
        }
        else {
            res.status(404);
            throw new Error('Blog not found or not published');
        }
    }
    catch (error) {
        next(error);
    }
};
// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        const createdBlog = await blog.save();
        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: createdBlog,
        });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            Object.assign(blog, req.body);
            const updatedBlog = await blog.save();
            res.status(200).json({
                success: true,
                message: 'Blog updated successfully',
                data: updatedBlog,
            });
        }
        else {
            res.status(404);
            throw new Error('Blog not found');
        }
    }
    catch (error) {
        next(error);
    }
};
// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            await blog.deleteOne();
            res.status(200).json({
                success: true,
                message: 'Blog deleted successfully',
                data: {},
            });
        }
        else {
            res.status(404);
            throw new Error('Blog not found');
        }
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=blogController.js.map