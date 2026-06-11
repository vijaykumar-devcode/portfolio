import express from 'express';
import { getCertificates, createCertificate, deleteCertificate, } from '../controllers/certificateController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.route('/')
    .get(getCertificates)
    .post(protect, admin, createCertificate);
router.route('/:id')
    .delete(protect, admin, deleteCertificate);
export default router;
//# sourceMappingURL=certificateRoutes.js.map