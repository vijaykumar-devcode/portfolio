import Skill from '../models/Skill.js';
// @desc    Get all visible skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find({ isVisible: true });
        res.status(200).json({ success: true, data: skills });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Get all skills (including hidden)
// @route   GET /api/skills/admin
// @access  Private/Admin
export const getAdminSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({ success: true, data: skills });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Create a skill category
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res, next) => {
    try {
        const { category, icon, color, items, isVisible } = req.body;
        const skill = await Skill.create({ category, icon, color, items, isVisible });
        res.status(201).json({ success: true, data: skill });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res, next) => {
    try {
        const { category, icon, color, items, isVisible } = req.body;
        const skill = await Skill.findByIdAndUpdate(req.params.id, { category, icon, color, items, isVisible }, { returnDocument: 'after', runValidators: true });
        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }
        res.status(200).json({ success: true, data: skill });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        next(error);
    }
};
// @desc    Toggle skill visibility
// @route   PATCH /api/skills/:id/toggle
// @access  Private/Admin
export const toggleSkillVisibility = async (req, res, next) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }
        skill.isVisible = !skill.isVisible;
        await skill.save();
        res.status(200).json({ success: true, data: skill });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=skillController.js.map