import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
export declare const upload: multer.Multer;
export declare const uploadCV: multer.Multer;
/**
 * Upload a buffer to Cloudinary v2 using a readable stream.
 * Returns the secure URL and public_id.
 */
export declare const uploadToCloudinary: (buffer: Buffer, folder: string, resourceType?: "image" | "raw" | "auto") => Promise<{
    url: string;
    publicId: string;
}>;
export declare const deleteFromCloudinary: (publicId: string) => Promise<any>;
export default cloudinary;
//# sourceMappingURL=cloudinary.d.ts.map