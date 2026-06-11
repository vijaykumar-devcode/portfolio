import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  type: 'CONTACT' | 'INQUIRY';
  messageId?: mongoose.Types.ObjectId;
  isRead: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    type: { type: String, enum: ['CONTACT', 'INQUIRY'], required: true },
    messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>('Notification', notificationSchema);
export default Notification;
