import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  coverImage: string;
  screenshots: string[];
  githubLink?: string;
  liveDemo?: string;
  challenges?: string;
  learnings?: string;
}

const projectSchema = new Schema<IProject>(
  {
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
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;
