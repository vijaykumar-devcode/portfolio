import type { Request, Response, NextFunction } from 'express';
import Certificate from '../models/Certificate.js';

// @desc    Fetch all certificates
// @route   GET /api/certificates
// @access  Public
export const getCertificates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Certificates fetched successfully',
      data: certificates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private/Admin
export const createCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certificate = new Certificate(req.body);
    const createdCertificate = await certificate.save();
    
    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: createdCertificate,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
export const deleteCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (certificate) {
      await certificate.deleteOne();
      res.status(200).json({
        success: true,
        message: 'Certificate deleted successfully',
        data: {},
      });
    } else {
      res.status(404);
      throw new Error('Certificate not found');
    }
  } catch (error) {
    next(error);
  }
};
