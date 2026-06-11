import mongoose, { Document, Schema } from 'mongoose';
const notificationSchema = new Schema({
    type: { type: String, enum: ['CONTACT', 'INQUIRY'], required: true },
    messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
//# sourceMappingURL=Notification.js.map