import React from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, BookOpen, Award, MessageSquare } from 'lucide-react';
import { useProjects } from '../../services/projectService.js';
import { useBlogs } from '../../services/blogService.js';
import { useCertificates } from '../../services/certificateService.js';
import { useMessages } from '../../services/messageService.js';
import { useProfile, useUpdateProfile, useUploadCV } from '../../services/userService.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { UploadCloud, FileText, CheckCircle, Shield } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface border border-border rounded-xl p-6 flex items-center gap-4"
  >
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-muted text-sm">{label}</p>
      <p className="text-3xl font-bold text-text">{value}</p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { data: projects } = useProjects();
  const { data: blogs } = useBlogs();
  const { data: certificates } = useCertificates();
  const { data: messages } = useMessages();
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadCV = useUploadCV();

  const [uploadError, setUploadError] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [credMessage, setCredMessage] = React.useState('');
  const [isUpdatingCreds, setIsUpdatingCreds] = React.useState(false);

  // Set initial username if available
  React.useEffect(() => {
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredMessage('');
    setIsUpdatingCreds(true);
    try {
      const payload: any = {};
      if (username) payload.username = username;
      if (password) payload.password = password;
      
      if (Object.keys(payload).length === 0) return;
      
      await updateProfile.mutateAsync(payload);
      setCredMessage('Credentials updated successfully!');
      setPassword(''); // clear password field after update
    } catch (err: any) {
      setCredMessage(err.response?.data?.message || 'Failed to update credentials');
    } finally {
      setIsUpdatingCreds(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    
    // Check size limit (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('File exceeds 2MB limit.');
      return;
    }

    try {
      setIsUploading(true);
      await uploadCV.mutateAsync(file);
      alert('CV uploaded successfully!');
    } catch (err: any) {
      setUploadError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const unread = messages?.filter(m => !m.isRead).length ?? 0;

  const stats = [
    { label: 'Total Projects', value: projects?.length ?? 0, icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'Blog Posts', value: blogs?.length ?? 0, icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Certificates', value: certificates?.length ?? 0, icon: Award, color: 'bg-green-500' },
    { label: 'Unread Messages', value: unread, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-text mb-2">Dashboard</h1>
      <p className="text-muted mb-8">Welcome back! Here's an overview of your portfolio.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} transition={{ delay: i * 0.1 }}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-text mb-4">Recent Messages</h2>
          {(messages?.length ?? 0) === 0 ? (
            <p className="text-muted">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {messages?.slice(0, 5).map(msg => (
                <div key={msg._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-background transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.isRead ? 'bg-muted' : 'bg-primary'}`} />
                  <div>
                    <p className="font-medium text-text text-sm">{msg.name} <span className="text-muted font-normal">— {msg.subject}</span></p>
                    <p className="text-xs text-muted mt-0.5">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-text mb-4">Resume / CV Settings</h2>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors relative">
            <input 
              type="file" 
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              onChange={handleCVUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {isUploading ? <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /> : <UploadCloud size={24} />}
              </div>
              <div>
                <p className="font-medium text-text">{isUploading ? 'Uploading...' : 'Click or Drag to Upload CV'}</p>
                <p className="text-xs text-muted mt-1">Supports PDF, DOCX, PNG, JPG (Max 2MB)</p>
              </div>
            </div>
          </div>
          
          {uploadError && <p className="text-red-500 text-sm mt-3 font-medium">{uploadError}</p>}
          
          {profile?.cvUrl && (
            <div className="mt-4 p-4 bg-background rounded-lg border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-primary" size={20} />
                <span className="text-sm font-medium text-text">Current CV Uploaded</span>
              </div>
              <a 
                href={profile.cvUrl.startsWith('/') ? `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')}${profile.cvUrl}` : profile.cvUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm text-primary hover:underline"
              >
                View File
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-surface border border-border rounded-xl p-6 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
            <Shield size={20} />
          </div>
          <h2 className="text-xl font-bold text-text">Admin Credentials</h2>
        </div>
        <p className="text-sm text-muted mb-6">Update your login username and password. Make sure to use a strong password.</p>
        
        <form onSubmit={handleUpdateCredentials} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">New Username</label>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="admin" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">New Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Leave blank to keep current" 
            />
          </div>
          <Button type="submit" variant="primary" disabled={isUpdatingCreds || (!username && !password)}>
            {isUpdatingCreds ? 'Updating...' : 'Update Credentials'}
          </Button>
          
          {credMessage && (
            <p className={`text-sm mt-2 font-medium ${credMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {credMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
