import mongoose, { Document, Schema } from 'mongoose';
const blogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // Rich text / Markdown
    coverImage: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
//# sourceMappingURL=Blog.js.map