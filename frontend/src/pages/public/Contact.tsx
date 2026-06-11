import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { useSendMessage } from '../../services/messageService.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  jobRole: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  content: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { mutateAsync, isPending } = useSendMessage();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync(data);
      setSent(true);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-text mb-2">Hire Me / Contact</h1>
        <p className="text-muted mb-10">Have an opportunity or want to connect? Drop a message below.</p>
      </motion.div>

      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface border border-border rounded-2xl p-10 text-center"
        >
          <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-text mb-2">Message Sent!</h2>
          <p className="text-muted">Message sent successfully. Thank you for reaching out.</p>
          <Button onClick={() => setSent(false)} variant="outline" className="mt-6">Send Another</Button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-surface border border-border rounded-2xl p-8 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1">Name *</label>
              <Input id="contact-name" autoComplete="name" {...register('name')} placeholder="Your Name" error={errors.name?.message} />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1">Email *</label>
              <Input id="contact-email" type="email" autoComplete="email" {...register('email')} placeholder="you@company.com" error={errors.email?.message} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-company" className="block text-sm font-medium text-text mb-1">Company</label>
              <Input id="contact-company" autoComplete="organization" {...register('company')} placeholder="Company Name (optional)" />
            </div>
            <div>
              <label htmlFor="contact-jobrole" className="block text-sm font-medium text-text mb-1">Job Role</label>
              <Input id="contact-jobrole" autoComplete="organization-title" {...register('jobRole')} placeholder="e.g. Frontend Engineer" />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium text-text mb-1">Subject *</label>
            <Input id="contact-subject" autoComplete="off" {...register('subject')} placeholder="e.g. Job Opportunity - React Developer" error={errors.subject?.message} />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-1">Message *</label>
            <textarea
              id="contact-message"
              {...register('content')}
              rows={5}
              placeholder="Your message..."
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            />
            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
          </div>

          <Button id="contact-submit" type="submit" variant="primary" size="lg" className="w-full" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      )}
    </section>
  );
}
