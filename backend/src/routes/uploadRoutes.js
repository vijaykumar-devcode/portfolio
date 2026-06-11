import express from 'express';
import { uploadImage, uploadMultipleImages, uploadCVFile } from '../controllers/uploadController.js';
import { upload, uploadCV } from '../config/cloudinary.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Apply auth middlewares (must be logged in & admin)
router.use(protect, admin);
// Single image upload
router.post('/', upload.single('image'), uploadImage);
// CV upload
router.post('/cv', uploadCV.single('cv'), uploadCVFile);
// Multiple images upload
router.post('/multiple', upload.array('images', 5), uploadMultipleImages);
export default router;
//# sourceMappingURL=uploadRoutes.js.map