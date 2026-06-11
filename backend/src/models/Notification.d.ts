import mongoose, { Document } from 'mongoose';
export interface INotification extends Document {
    type: 'CONTACT' | 'INQUIRY';
    messageId?: mongoose.Types.ObjectId;
    isRead: boolean;
}
declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, mongoose.DefaultSchemaOptions> & INotification & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, INotification>;
export default Notification;
//# sourceMappingURL=Notification.d.ts.map