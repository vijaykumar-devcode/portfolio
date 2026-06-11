import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { ImageUpload } from '../../components/ui/ImageUpload.js';
import { useCreateCertificate } from '../../services/certificateService.js';

const schema = z.object({
  name: z.string().min(2, 'Certificate name required'),
  issuingOrganization: z.string().min(2, 'Issuing organization required'),
  thumbnail: z.string().min(1, 'Certificate image required'),
});

type FormValues = z.infer<typeof schema>;

interface CertificateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateFormModal({ isOpen, onClose }: CertificateFormModalProps) {
  const { mutateAsync: createCertificate, isPending } = useCreateCertificate();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const thumbnail = watch('thumbnail');

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await createCertificate(data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Certificate" size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-text mb-1 block">Certificate Name *</label>
          <Input {...register('name')} placeholder="e.g. AWS Certified Solutions Architect" error={errors.name?.message} />
        </div>
        <div>
          <label className="text-sm font-medium text-text mb-1 block">Issuing Organization *</label>
          <Input {...register('issuingOrganization')} placeholder="e.g. Amazon Web Services" error={errors.issuingOrganization?.message} />
        </div>

        <ImageUpload
          label="Certificate Image *"
          value={thumbnail}
          onChange={(url) => setValue('thumbnail', url)}
        />
        {errors.thumbnail && <p className="text-xs text-red-500">{errors.thumbnail.message}</p>}

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Uploading...' : 'Save Certificate'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
