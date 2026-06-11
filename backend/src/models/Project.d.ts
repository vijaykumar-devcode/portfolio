import mongoose, { Document } from 'mongoose';
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
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, mongoose.DefaultSchemaOptions> & IProject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProject>;
export default Project;
//# sourceMappingURL=Project.d.ts.map