import { uploadToCloudinary } from '../config/cloudinary.js';
import User from '../models/User.js';
// @desc    Upload a single image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('No file uploaded');
        }
        const folder = req.query.folder || 'general';
        const result = await uploadToCloudinary(req.file.buffer, folder, 'image');
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Upload a CV (PDF, DOCX, Image) to Cloudinary
// @route   POST /api/upload/cv
// @access  Private/Admin
export const uploadCVFile = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('No CV file uploaded');
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        // Save directly to MongoDB
        user.cvData = req.file.buffer;
        user.cvContentType = req.file.mimetype;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'CV uploaded successfully to Database',
            data: { url: '/api/users/cv', publicId: 'mongodb' },
        });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res, next) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            res.status(400);
            throw new Error('No files uploaded');
        }
        const folder = req.query.folder || 'general';
        const uploads = await Promise.all(files.map((file) => uploadToCloudinary(file.buffer, folder)));
        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: uploads,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=uploadController.js.map