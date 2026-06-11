import mongoose from 'mongoose';
const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    items: [
        {
            type: String,
            trim: true,
        },
    ],
    isVisible: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
//# sourceMappingURL=Skill.js.map