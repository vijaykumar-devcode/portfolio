import mongoose, { Document, Schema } from 'mongoose';
const projectSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    features: [{ type: String }],
    techStack: [{ type: String }],
    coverImage: { type: String, required: true }, // Cloudinary URL
    screenshots: [{ type: String }], // Array of Cloudinary URLs
    githubLink: { type: String },
    liveDemo: { type: String },
    challenges: { type: String },
    learnings: { type: String },
}, { timestamps: true });
const Project = mongoose.model('Project', projectSchema);
export default Project;
//# sourceMappingURL=Project.js.map