import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Trash2, MessageSquare } from 'lucide-react';
import { useNotifications, useMarkNotificationRead, useDeleteNotification } from '../../services/notificationService.js';
import { Button } from '../../components/ui/Button.js';
import { cn } from '../../components/ui/Button.js';

export default function AdminNotifications() {
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: deleteNotif } = useDeleteNotification();

  const unreadCount = notifications?.filter(n => !n.isRead).length ?? 0;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Notifications</h1>
          <p className="text-muted mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="ml-auto bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-surface rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      ) : notifications?.length === 0 ? (
        <div className="text-center py-20">
          <BellOff className="mx-auto text-muted mb-4" size={40} />
          <p className="text-muted">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications?.map((notif, i) => (
            <motion.div
              key={notif._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'bg-surface border rounded-xl p-4 flex items-center gap-4 transition-colors',
                notif.isRead ? 'border-border' : 'border-primary/30 bg-primary/5'
              )}
            >
              <div className={cn('p-2 rounded-lg flex-shrink-0', notif.isRead ? 'bg-muted/20' : 'bg-primary/10')}>
                <MessageSquare size={18} className={notif.isRead ? 'text-muted' : 'text-primary'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium', notif.isRead ? 'text-muted' : 'text-text')}>
                  New {notif.type === 'CONTACT' ? 'contact form submission' : 'recruiter inquiry'}
                </p>
                {notif.messageId && typeof notif.messageId === 'object' && (
                  <p className="text-xs text-muted truncate">
                    From: {notif.messageId.name} — {notif.messageId.subject}
                  </p>
                )}
                <p className="text-xs text-muted mt-0.5">{new Date(notif.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!notif.isRead && (
                  <button onClick={() => markRead(notif._id)} className="text-muted hover:text-primary transition-colors" title="Mark as read">
                    <Bell size={16} />
                  </button>
                )}
                <button onClick={() => deleteNotif(notif._id)} className="text-muted hover:text-red-500 transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
