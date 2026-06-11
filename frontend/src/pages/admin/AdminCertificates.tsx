import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { useCertificates, useDeleteCertificate } from '../../services/certificateService.js';
import { Button } from '../../components/ui/Button.js';
import { CertificateFormModal } from '../../components/admin/CertificateFormModal.js';

export default function AdminCertificates() {
  const { data: certificates, isLoading } = useCertificates();
  const { mutate: deleteCertificate } = useDeleteCertificate();
  const [selected, setSelected] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const selectedCert = certificates?.find(c => c._id === selected);
  const handleDelete = (id: string) => { if (confirm('Delete this certificate?')) deleteCertificate(id); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Certificates</h1>
          <p className="text-muted mt-1">Manage your certificates.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setIsFormOpen(true)}><Plus size={16} /> Upload Certificate</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="bg-surface rounded-xl border border-border h-52 animate-pulse" />)
          : certificates?.map((cert) => (
              <motion.div key={cert._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-border rounded-xl overflow-hidden group">
                <div className="h-36 overflow-hidden cursor-pointer" onClick={() => setSelected(cert._id)}>
                  <img src={cert.thumbnail} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-text line-clamp-1">{cert.name}</h3>
                    <p className="text-xs text-muted">{cert.issuingOrganization}</p>
                  </div>
                  <button onClick={() => handleDelete(cert._id)} aria-label="Delete certificate" className="text-muted hover:text-red-500 shrink-0 transition-colors"><Trash2 size={14} /></button>
                </div>
              </motion.div>
            ))}
      </div>

      {!isLoading && certificates?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted mb-4">No certificates uploaded yet.</p>
          <Button variant="primary" className="gap-2" onClick={() => setIsFormOpen(true)}><Plus size={16} /> Upload Certificate</Button>
        </div>
      )}

      <CertificateFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <AnimatePresence>
        {selectedCert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()} className="bg-surface rounded-2xl border border-border max-w-2xl w-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div><h3 className="font-bold text-text">{selectedCert.name}</h3><p className="text-sm text-muted">{selectedCert.issuingOrganization}</p></div>
                <button onClick={() => setSelected(null)} aria-label="Close modal" className="text-muted hover:text-text"><X size={20} /></button>
              </div>
              <div className="p-4"><img src={selectedCert.thumbnail} alt={selectedCert.name} className="w-full rounded-lg object-contain max-h-[60vh]" /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
