import mongoose, { Document } from 'mongoose';
export interface IMessage extends Document {
    name: string;
    email: string;
    company?: string;
    jobRole?: string;
    subject: string;
    content: string;
    isRead: boolean;
    isResponded: boolean;
}
declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMessage>;
export default Message;
//# sourceMappingURL=Message.d.ts.map