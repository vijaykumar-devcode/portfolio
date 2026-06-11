import express from 'express';
import { getSkills, getAdminSkills, createSkill, updateSkill, deleteSkill, toggleSkillVisibility, } from '../controllers/skillController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();
// Public route
router.route('/').get(getSkills);
// Admin routes
router.route('/admin').get(protect, admin, getAdminSkills);
router.route('/').post(protect, admin, createSkill);
router.route('/:id').put(protect, admin, updateSkill).delete(protect, admin, deleteSkill);
router.route('/:id/toggle').patch(protect, admin, toggleSkillVisibility);
export default router;
//# sourceMappingURL=skillRoutes.js.map