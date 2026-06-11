import mongoose, { Document } from 'mongoose';
export interface ICertificate extends Document {
    name: string;
    issuingOrganization: string;
    thumbnail: string;
}
declare const Certificate: mongoose.Model<ICertificate, {}, {}, {}, mongoose.Document<unknown, {}, ICertificate, {}, mongoose.DefaultSchemaOptions> & ICertificate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICertificate>;
export default Certificate;
//# sourceMappingURL=Certificate.d.ts.map