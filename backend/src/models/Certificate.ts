import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  name: string;
  issuingOrganization: string;
  thumbnail: string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    name: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);
export default Certificate;
