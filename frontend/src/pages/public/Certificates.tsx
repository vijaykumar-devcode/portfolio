import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCertificates } from '../../services/certificateService.js';

export default function Certificates() {
  const { data: certificates, isLoading, isError } = useCertificates();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCert = certificates?.find(c => c._id === selected);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-text mb-2">Certificates</h1>
        <p className="text-muted mb-12">My learning journey & achievements.</p>
      </motion.div>

      {isError && <p className="text-red-500">Failed to load certificates.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border animate-pulse">
                <div className="h-40 bg-border rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-border rounded" />
                  <div className="h-3 bg-border rounded w-2/3" />
                </div>
              </div>
            ))
          : certificates?.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(cert._id)}
                className="bg-surface rounded-xl border border-border overflow-hidden cursor-pointer group hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                <div className="overflow-hidden h-40">
                  <img src={cert.thumbnail} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text text-sm mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-xs text-muted">{cert.issuingOrganization}</p>
                </div>
              </motion.div>
            ))}
      </div>

      {!isLoading && certificates?.length === 0 && (
        <div className="text-center py-20"><p className="text-muted">No certificates found yet.</p></div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl border border-border max-w-2xl w-full overflow-hidden"
            >
              <div className="flex items-start justify-between p-4 border-b border-border">
                <div>
                  <h3 className="font-bold text-text">{selectedCert.name}</h3>
                  <p className="text-sm text-muted">{selectedCert.issuingOrganization}</p>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Close modal" className="text-muted hover:text-text transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedCert.thumbnail}
                  alt={selectedCert.name}
                  className="w-full rounded-lg object-contain max-h-[60vh]"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
