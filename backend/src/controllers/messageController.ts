import type { Request, Response, NextFunction } from 'express';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Fetch all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new message (Contact form submission)
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, company, jobRole, subject, content } = req.body;

    const message = new Message({
      name,
      email,
      company,
      jobRole,
      subject,
      content,
    });

    const createdMessage = await message.save();

    // Create Notification for admin
    await Notification.create({
      type: 'CONTACT',
      messageId: createdMessage._id,
    });

    // Send auto-reply to user
    try {
      await sendEmail({
        email: email,
        subject: 'Thank you for reaching out!',
        message: `Hi ${name},\n\nThank you for reaching out. I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nYour Name`,
      });

      // Send notification to admin (You)
      await sendEmail({
        email: process.env.EMAIL_USER as string, // Your email
        replyTo: email, // Set Reply-To as the recruiter's email so you can reply directly
        subject: `New Portfolio Message: ${subject}`,
        message: `You have received a new message from ${name} (${email}).\n\nCompany: ${company || 'N/A'}\nRole: ${jobRole || 'N/A'}\n\nMessage:\n${content}`,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // We don't fail the request if the email fails, just log it.
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. Thank you for reaching out.',
      data: createdMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status (e.g. read, responded)
// @route   PATCH /api/messages/:id
// @access  Private/Admin
export const updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      if (req.body.isRead !== undefined) message.isRead = req.body.isRead;
      if (req.body.isResponded !== undefined) message.isResponded = req.body.isResponded;

      const updatedMessage = await message.save();

      res.status(200).json({
        success: true,
        message: 'Message status updated successfully',
        data: updatedMessage,
      });
    } else {
      res.status(404);
      throw new Error('Message not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      
      // Also delete related notifications
      await Notification.deleteMany({ messageId: req.params.id as any });

      res.status(200).json({
        success: true,
        message: 'Message deleted successfully',
        data: {},
      });
    } else {
      res.status(404);
      throw new Error('Message not found');
    }
  } catch (error) {
    next(error);
  }
};
