import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, ExternalLink, Code2, Server, Database, GitBranch, Palette, Wrench, Network, Smartphone, CheckCircle, X, ChevronRight, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { useProjects } from '../../services/projectService.js';
import { useCertificates } from '../../services/certificateService.js';
import { useSendMessage } from '../../services/messageService.js';
import { useSkills } from '../../services/skillService.js';
import { useProfile } from '../../services/userService.js';
import { ScrambleText, TextReveal } from '../../components/ui/TypographyAnimations.js';
import { TiltCard } from '../../components/ui/TiltCard.js';

// ─── Animation Variants ────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section id={id} className={className}>
      <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="w-full h-full">
        {children}
      </motion.div>
    </section>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Code2, Server, Database, GitBranch, Palette, Wrench, Network, Smartphone
};
// ─── Contact Schema ────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().optional(),
  jobRole: z.string().optional(),
  subject: z.string().min(6, 'Subject must be at least 6 characters'),
  content: z.string().min(10, 'Message must be at least 10 characters'),
});
type ContactFormValues = z.infer<typeof contactSchema>;

export default function Home() {
  const { data: projects } = useProjects();
  const { data: certificates, isLoading: isCertsLoading } = useCertificates();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();
  const { data: profile } = useProfile();
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const selectedCertificateData = certificates?.find(c => c._id === selectedCert);
  const [contactSent, setContactSent] = useState(false);

  const { register: registerContact, handleSubmit: handleContactSubmit, formState: { errors: contactErrors }, reset: resetContact, watch } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const messageContent = watch('content') || '';

  const onContactSubmit = async (data: ContactFormValues) => {
    try {
      await sendMessage(data);
      setContactSent(true);
      resetContact();
    } catch (err) {
      console.error(err);
    }
  };

  const projectList = projects || [];

  return (
    <div className="overflow-x-hidden">

      {/* ── 1. Hero Section ──────────────────────────────────────────── */}
      <Section id="home" className="relative min-h-[92vh] flex items-center">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 sm:mt-0">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Text Content */}
            <div className="max-w-3xl lg:w-3/5">
              <motion.p variants={fadeUp} className="text-primary font-medium mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-primary inline-block" />
                Hi, I'm
              </motion.p>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text mb-6 leading-tight">
                <ScrambleText text="Vijay" />{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-br from-primary to-[#7c3aed]">
                  <ScrambleText text="Kumar" />
                </span>
              </motion.h1>

              <div className="text-xl sm:text-2xl text-muted max-w-2xl mb-4 leading-relaxed font-medium">
                <TextReveal text="Full Stack Developer | Problem Solver | Lifelong Learner" delay={0.3} />
              </div>

              <motion.p variants={fadeUp} className="text-muted max-w-xl mb-10 leading-relaxed">
                I craft modern, scalable web applications that combine clean architecture, high performance, and exceptional user experiences.I enjoy turning complex ideas into reliable digital products that make an impact.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
                <a href="#projects">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="primary" className="gap-2 shadow-lg shadow-primary/25 cursor-pointer">
                      View My Projects <ArrowRight size={18} />
                    </Button>
                  </motion.div>
                </a>
                <div className="flex gap-4">
              <a 
                href={profile?.cvUrl ? (profile.cvUrl.startsWith('/') ? `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '')}${profile.cvUrl}` : profile.cvUrl) : '#'} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => !profile?.cvUrl && e.preventDefault()}
                aria-disabled={!profile?.cvUrl}
              >
                <motion.div whileHover={profile?.cvUrl ? { scale: 1.05 } : {}} whileTap={profile?.cvUrl ? { scale: 0.95 } : {}}>
                  <Button size="lg" variant="outline" className={!profile?.cvUrl ? "opacity-50 cursor-not-allowed" : "cursor-pointer text-md"} disabled={!profile?.cvUrl}>
                    {profile?.cvUrl ? 'Download CV' : 'CV Unavailable'}
                  </Button>
                </motion.div>
              </a>
            </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
                  <FaGithub size={20} /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
                  <FaLinkedin size={20} /> LinkedIn
                </a>
                <a href="mailto:you@email.com" className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
                  <Mail size={20} /> Email
                </a>
              </motion.div>
            </div>

            <div className="lg:w-2/5 flex justify-center lg:justify-end">
              <TiltCard>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100"
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-primary to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 bg-background/50 backdrop-blur-sm" />
                  <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-surface shadow-2xl bg-surface">
                    <img
                      src="/myphoto.png" 
                      alt="Vijay Kumar - Full Stack Developer"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Your+Name&size=512&background=random"; }}
                    />
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted">
          <div className="w-6 h-10 rounded-full border-2 border-muted flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted rounded-full" />
          </div>
        </motion.div>
      </Section>

      {/* ── 2. About Section ──────────────────────────────────────── */}
      <Section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
                About Me
              </h2>

              <p className="text-muted leading-relaxed mb-4">
               I'm a CSE student at IIIT Bhagalpur passionate about full-stack development and creating scalable, user-centric web applications using the MERN stack.
              </p>

              <ul className="text-muted leading-relaxed mb-4 space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-primary mt-1 shrink-0" size={18} />
                  <span><strong>Frontend Development:</strong> Building responsive and interactive user interfaces using React.js, Next.js, TypeScript, Tailwind CSS, and modern UI/UX principles.</span>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="text-primary mt-1 shrink-0" size={18} />
                  <span><strong>Backend Development:</strong> Developing scalable server-side applications with Node.js, Express.js, MongoDB, and RESTful APIs.</span>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="text-primary mt-1 shrink-0" size={18} />
                  <span><strong>Computer Science Fundamentals:</strong> Strong understanding of Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks, and Software Engineering.</span>
                </li>

                <li className="flex items-start gap-3">
                  <ChevronRight className="text-primary mt-1 shrink-0" size={18} />
                  <span><strong>System Design & Engineering:</strong> Focused on writing clean, maintainable, and scalable code while following industry-standard architecture and best practices.</span>
                </li>
              </ul>

              <p className="text-muted leading-relaxed mb-8">
                Beyond coding, I'm deeply interested in understanding the principles behind building reliable and high-performance systems. Currently, I'm focused on developing end-to-end full-stack applications
              </p>
                  <a href="#contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                      <Button size="lg" variant="outline" className="gap-2 cursor-pointer">Hire Me</Button>
                    </motion.div>
                  </a>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-10">
            {[
              { label: 'Projects Built', value: `${projectList.length}+` },
              { label: 'Technologies', value: '10+' },
              { label: 'CS Subjects', value: '6+' },
              { label: 'Certifications', value: '4+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                <p className="text-4xl font-black text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── 3. Skills Section ──────────────────────────────────────── */}
      <Section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <motion.div variants={fadeUp} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">Skills & Technologies</h2>
          <p className="text-muted">My technical toolkit for building modern applications.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isSkillsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface border border-border rounded-2xl p-6 animate-pulse">
                <div className="w-12 h-12 rounded-xl bg-border mb-4" />
                <div className="h-4 bg-border rounded w-1/2 mb-3" />
                <div className="flex gap-2"><div className="h-6 w-16 bg-border rounded-md" /><div className="h-6 w-12 bg-border rounded-md" /></div>
              </div>
            ))
          ) : skills?.map((skill) => {
            const Icon = iconMap[skill.icon] || Code2; // Fallback to Code2 if not found
            return (
              <motion.div key={skill._id} variants={fadeUp} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-surface border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-text mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-muted group-hover:border-primary/30 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ── 4. Projects Section ─────────────────────────────────────── */}
      <Section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">Projects</h2>
            <p className="text-muted">A selection of things I've built.</p>
          </div>
        </motion.div>

        {projectList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project, i) => (
              <motion.div key={project._id} variants={fadeUp} transition={{ delay: i * 0.1 }} className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden group hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                <div className="relative overflow-hidden h-48">
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 grow flex flex-col">
                  <h3 className="font-bold text-lg text-text mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tech}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-xs px-2 py-0.5 bg-muted/10 text-muted rounded-full">+{project.techStack.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <Link to={`/projects/${project.slug}`}>
                      <Button size="sm" variant="outline" className="text-xs py-1.5 h-auto">View Details</Button>
                    </Link>
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" title="GitHub Repository">
                          <FaGithub size={18} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" title="Live Demo">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface rounded-2xl border border-border">
            <p className="text-muted">No projects found yet.</p>
          </div>
        )}
      </Section>

      {/* ── 5. Education Section ───────────────────────────────────── */}
      <Section id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <motion.div variants={fadeUp} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">Education</h2>
          <p className="text-muted">My academic background.</p>
        </motion.div>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
          
          <motion.div variants={fadeUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <span className="text-sm font-bold">UG</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-1">
                <h3 className="font-bold text-lg text-text">B.Tech in Computer Science & Engineering</h3>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-flex items-center w-max">Present</span>
              </div>
              <p className="text-muted text-sm mb-3">Indian Institute of Information Technology Bhagalpur</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-surface text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className="text-sm font-bold text-text">12th</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-1">
                <h3 className="font-bold text-lg text-text">Class 12th (Senior Secondary)</h3>
                <span className="text-sm text-muted">2023</span>
              </div>
              <p className="text-muted text-sm mb-3">C.M. Science college, Darbhanaga</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-surface text-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <span className="text-sm font-bold text-text">10th</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface border border-border rounded-2xl p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-1">
                <h3 className="font-bold text-lg text-text">Class 10th (Secondary)</h3>
                <span className="text-sm text-muted">2021</span>
              </div>
              <p className="text-muted text-sm mb-3">M.L. Academy Laheriasarai, Darbhanaga</p>
              
            </div>
          </motion.div>

        </div>
      </Section>

      {/* ── 6. Achievements Section ────────────────────────────────── */}
      <Section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <motion.div variants={fadeUp} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">Achievements & Certificates</h2>
          <p className="text-muted">My certifications and professional accomplishments.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isCertsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border animate-pulse">
                <div className="h-40 bg-border rounded-t-xl" />
                <div className="p-4 space-y-2"><div className="h-4 bg-border rounded" /><div className="h-3 bg-border rounded w-2/3" /></div>
              </div>
            ))
          ) : certificates && certificates.length > 0 ? (
            certificates.map((cert, i) => (
              <motion.div key={cert._id} variants={fadeUp} transition={{ delay: i * 0.1 }} onClick={() => setSelectedCert(cert._id)} className="bg-surface rounded-xl border border-border overflow-hidden cursor-pointer group hover:shadow-lg hover:border-primary transition-all duration-300">
                <div className="overflow-hidden h-40">
                  <img src={cert.thumbnail} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text text-sm mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-xs text-muted">{cert.issuingOrganization}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-surface rounded-2xl border border-border">
              <p className="text-muted">No achievements found yet.</p>
            </div>
          )}
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && selectedCertificateData && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCert(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-surface rounded-2xl border border-border max-w-2xl w-full overflow-hidden">
                <div className="flex items-start justify-between p-4 border-b border-border">
                  <div>
                    <h3 className="font-bold text-text">{selectedCertificateData.name}</h3>
                    <p className="text-sm text-muted">{selectedCertificateData.issuingOrganization}</p>
                  </div>
                  <button onClick={() => setSelectedCert(null)} aria-label="Close modal" className="text-muted hover:text-text transition-colors"><X size={20} /></button>
                </div>
                <div className="p-4">
                  <img src={selectedCertificateData.thumbnail} alt={selectedCertificateData.name} className="w-full rounded-lg object-contain max-h-[60vh]" onContextMenu={(e) => e.preventDefault()} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* ── 7. Contact Section ─────────────────────────────────────── */}
      <Section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">Get In Touch</h2>
          <p className="text-muted">Have an opportunity or want to connect? Drop a message below.</p>
        </motion.div>

        {contactSent && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} />
              <span className="font-medium">Message sent successfully! I'll get back to you shortly.</span>
            </div>
            <button onClick={() => setContactSent(false)} className="hover:bg-green-500/20 p-1 rounded-md transition-colors"><X size={16}/></button>
          </motion.div>
        )}

        <motion.form variants={fadeUp} onSubmit={handleContactSubmit(onContactSubmit)} className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-1.5">Name *</label>
              <Input id="contact-name" autoComplete="name" {...registerContact('name')} placeholder="Your Name" error={contactErrors.name?.message} />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-1.5">Email *</label>
              <Input id="contact-email" type="email" autoComplete="email" {...registerContact('email')} placeholder="you@company.com" error={contactErrors.email?.message} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-company" className="block text-sm font-medium text-text mb-1.5">Company</label>
              <Input id="contact-company" autoComplete="organization" {...registerContact('company')} placeholder="Company Name (optional)" />
            </div>
            <div>
              <label htmlFor="contact-jobrole" className="block text-sm font-medium text-text mb-1.5">Job Role</label>
              <Input id="contact-jobrole" autoComplete="organization-title" {...registerContact('jobRole')} placeholder="e.g. Frontend Engineer" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium text-text mb-1.5">Subject *</label>
            <Input id="contact-subject" autoComplete="off" {...registerContact('subject')} placeholder="e.g. Job Opportunity" error={contactErrors.subject?.message} />
          </div>
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label htmlFor="contact-message" className="block text-sm font-medium text-text">Message *</label>
              <span className={`text-xs font-medium ${messageContent.length > 0 && messageContent.length < 10 ? 'text-red-400' : 'text-muted'}`}>{messageContent.length} / 10 min chars</span>
            </div>
            <textarea
              id="contact-message"
              {...registerContact('content')}
              rows={5}
              placeholder="Your message..."
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 shadow-sm"
            />
            {contactErrors.content && <p className="mt-1 text-xs text-red-500">{contactErrors.content.message}</p>}
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button id="contact-submit" type="submit" variant="primary" size="lg" className="w-full mt-2 shadow-md shadow-primary/20 relative overflow-hidden group" disabled={isSending}>
              <motion.span animate={isSending ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }} className="flex items-center justify-center gap-2 w-full">
                {isSending ? 'Sending...' : 'Send Message'}
                {!isSending && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </motion.span>
              
              {/* Paper airplane flying animation */}
              <motion.div 
                initial={{ x: -100, y: 100, opacity: 0 }} 
                animate={isSending ? { x: [0, 200], y: [0, -200], opacity: [1, 0] } : {}} 
                transition={{ duration: 1, ease: "easeOut" }} 
                className="absolute"
              >
                {isSending && <Send size={24} className="text-white" />}
              </motion.div>
            </Button>
          </motion.div>
        </motion.form>
      </Section>

    </div>
  );
}
