import mongoose, { Document, Schema } from 'mongoose';
const certificateSchema = new Schema({
    name: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    thumbnail: { type: String, required: true },
}, { timestamps: true });
const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
//# sourceMappingURL=Certificate.js.map