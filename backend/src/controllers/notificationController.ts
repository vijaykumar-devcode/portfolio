import type { Request, Response, NextFunction } from 'express';
import Notification from '../models/Notification.js';

// @desc    Fetch all notifications
// @route   GET /api/notifications
// @access  Private/Admin
export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await Notification.find({})
      .populate('messageId', 'name email subject')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: 'Notifications fetched', data: notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id
// @access  Private/Admin
export const updateNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) { res.status(404); throw new Error('Notification not found'); }

    notification.isRead = req.body.isRead ?? notification.isRead;
    const updated = await notification.save();

    res.status(200).json({ success: true, message: 'Notification updated', data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) { res.status(404); throw new Error('Notification not found'); }

    await notification.deleteOne();
    res.status(200).json({ success: true, message: 'Notification deleted', data: {} });
  } catch (error) {
    next(error);
  }
};
