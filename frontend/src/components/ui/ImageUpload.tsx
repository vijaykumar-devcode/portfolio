import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '../../services/uploadService.js';
import { cn } from './Button.js';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = 'Upload Image', className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(error.response?.data?.message || 'Image upload failed. It might be too large or invalid format.');
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn('w-full', className)}>
      {label && <p className="text-sm font-medium text-text mb-1.5">{label}</p>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Remove image"
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary hover:bg-surface'
          )}
        >
          <input type="file" accept="image/*" className="hidden" onChange={handleChange} disabled={isUploading} />
          {isUploading ? (
            <>
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm text-muted">Uploading...</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Upload size={20} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-text">Drag & drop or click to upload</p>
              <p className="text-xs text-muted mt-1">PNG, JPG, WebP up to 4MB</p>
            </>
          )}
        </label>
      )}
    </div>
  );
}
