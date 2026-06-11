import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, Briefcase, CheckCircle2, Trash2, MailOpen } from 'lucide-react';
import { useMessages, useUpdateMessageStatus, useDeleteMessage } from '../../services/messageService.js';
import { Button } from '../../components/ui/Button.js';
import type { Message } from '../../types/index.js';
import { cn } from '../../components/ui/Button.js';

export default function AdminMessages() {
  const { data: messages, isLoading } = useMessages();
  const { mutate: updateStatus } = useUpdateMessageStatus();
  const { mutate: deleteMessage } = useDeleteMessage();
  const [selected, setSelected] = useState<Message | null>(null);

  const handleOpen = (msg: Message) => {
    setSelected(msg);
    if (!msg.isRead) updateStatus({ id: msg._id, isRead: true });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this message?')) {
      deleteMessage(id);
      if (selected?._id === id) setSelected(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-2">Messages</h1>
      <p className="text-muted mb-8">Recruiter inquiries and contact form submissions.</p>

      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* List */}
        <div className="w-80 flex-shrink-0 bg-surface border border-border rounded-xl overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-border rounded-lg animate-pulse" />)}
            </div>
          ) : messages?.length === 0 ? (
            <div className="p-8 text-center text-muted">No messages yet.</div>
          ) : (
            messages?.map(msg => (
              <button
                key={msg._id}
                onClick={() => handleOpen(msg)}
                className={cn(
                  'w-full text-left p-4 border-b border-border hover:bg-background transition-colors',
                  selected?._id === msg._id && 'bg-primary/5 border-l-2 border-l-primary'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={cn('text-sm font-medium truncate', !msg.isRead ? 'text-text' : 'text-muted')}>{msg.name}</p>
                    <p className="text-xs text-muted truncate">{msg.subject}</p>
                  </div>
                  {!msg.isRead && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="flex-1 bg-surface border border-border rounded-xl overflow-y-auto">
          {!selected ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted">Select a message to read it</p>
            </div>
          ) : (
            <motion.div key={selected._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text">{selected.subject}</h2>
                  <p className="text-sm text-muted mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  {!selected.isResponded && (
                    <Button size="sm" variant="outline" className="gap-1.5 text-green-500 border-green-500/50 hover:bg-green-500/10"
                      onClick={() => updateStatus({ id: selected._id, isResponded: true })}>
                      <CheckCircle2 size={14} /> Mark Responded
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="gap-1.5 text-red-500 border-red-500/50 hover:bg-red-500/10"
                    onClick={() => handleDelete(selected._id)}>
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-background rounded-lg p-3 flex items-center gap-2">
                  <Mail size={16} className="text-muted" />
                  <div>
                    <p className="text-xs text-muted">From</p>
                    <p className="text-sm text-text font-medium">{selected.name} — {selected.email}</p>
                  </div>
                </div>
                {selected.company && (
                  <div className="bg-background rounded-lg p-3 flex items-center gap-2">
                    <Building2 size={16} className="text-muted" />
                    <div>
                      <p className="text-xs text-muted">Company</p>
                      <p className="text-sm text-text font-medium">{selected.company}</p>
                    </div>
                  </div>
                )}
                {selected.jobRole && (
                  <div className="bg-background rounded-lg p-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-muted" />
                    <div>
                      <p className="text-xs text-muted">Role</p>
                      <p className="text-sm text-text font-medium">{selected.jobRole}</p>
                    </div>
                  </div>
                )}
                <div className="bg-background rounded-lg p-3 flex items-center gap-2">
                  <MailOpen size={16} className="text-muted" />
                  <div>
                    <p className="text-xs text-muted">Status</p>
                    <p className={cn('text-sm font-medium', selected.isResponded ? 'text-green-500' : 'text-yellow-500')}>
                      {selected.isResponded ? 'Responded' : 'Pending response'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl p-5">
                <p className="text-text leading-relaxed whitespace-pre-wrap">{selected.content}</p>
              </div>

              <div className="mt-4 text-right">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}>
                  <Button variant="primary" size="sm" className="gap-2"><Mail size={14} /> Reply via Email</Button>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
