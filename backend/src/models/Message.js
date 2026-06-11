import mongoose, { Document, Schema } from 'mongoose';
const messageSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    jobRole: { type: String },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isResponded: { type: Boolean, default: false },
}, { timestamps: true });
const Message = mongoose.model('Message', messageSchema);
export default Message;
//# sourceMappingURL=Message.js.map