import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, ExternalLink, GitBranch, Mail } from 'lucide-react';
import { TextRotator } from '../ui/TextRotator';

// ─── Contact overlay data ─────────────────────────────────────────────────────

const CONTACT_INFO = {
  bio: 'Result-driven Software Engineer building scalable solutions that enhance user experience and streamline business operations, turning complex challenges into high-impact products.',
  mail: 'danred001@gmail.com',
  phone: '+503 75392732',
  languages: 'English, Spanish',
  location: 'La Libertad, El Salvador, willing to relocate',
};

const HERO_SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/daniel-reyes-01/',
    icon: ExternalLink,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/danred001',
    icon: GitBranch,
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT_INFO.mail}`,
    icon: Mail,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const Hero: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const wordA = ['complex', 'tedious', 'difficult', 'large', 'repetitive'];
  const wordB = ['clarity', 'precision', 'lucidity'];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden border-b-8 border-foreground">
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-64 h-64 bg-accent/10 rounded-none rotate-45 pointer-events-none" />
      <div className="absolute top-20 left-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full py-20">
        {/* Left Side: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start gap-6"
        >
          <div className="inline-block px-4 py-2 bg-primary text-white font-bold tracking-wider uppercase text-sm mb-2">
            Senior Fullstack Developer
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
            I transform <TextRotator words={wordA} className="text-primary px-1" /> processes into{' '}
            <span className="text-primary">
              systems with efficiency and{' '}
              <TextRotator words={wordB} className="underline decoration-4 underline-offset-8" />.
            </span>
          </h1>
          <p className="text-xl text-foreground/80 font-medium max-w-xl leading-relaxed mt-4">
            Specialist in scalable architectures and user experiences. Passionate about building
            robust, efficient, and business-focused software.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#projects">
              <Button variant="primary" className="flex items-center gap-2 group">
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline">Contact Me</Button>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Photo with hover overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block h-[600px] w-full"
        >
          {/* Solid color block behind */}
          <div className="absolute inset-0 bg-accent translate-x-6 translate-y-6 rounded-none" />

          {/* Image Container */}
          <div
            className="absolute inset-0 overflow-hidden rounded-none border-4 border-foreground cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Profile photo — always in colour */}
            <img
              src="/ProfilePhotoExtended.jpg"
              alt="Profile"
              className={`w-full h-full object-cover transition-all duration-500 ${hovered ? 'blur-sm scale-105' : 'blur-0 scale-100'
                }`}
            />

            {/* Contact overlay */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center px-8 py-8 bg-foreground/75 backdrop-blur-sm overflow-y-auto"
                >
                  {/* Title */}
                  <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">
                    Contact
                  </p>

                  {/* Bio */}
                  <p className="text-white/80 text-sm leading-relaxed mb-5">
                    {CONTACT_INFO.bio}
                  </p>

                  {/* Contact details */}
                  <ul className="space-y-1.5 mb-6 text-sm">
                    <li>
                      <span className="text-white/40 font-semibold uppercase tracking-wider text-xs">Mail</span>{' '}
                      <a
                        href={`mailto:${CONTACT_INFO.mail}`}
                        className="text-accent hover:underline ml-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {CONTACT_INFO.mail}
                      </a>
                    </li>
                    <li>
                      <span className="text-white/40 font-semibold uppercase tracking-wider text-xs">Phone</span>{' '}
                      <span className="text-white ml-2">{CONTACT_INFO.phone}</span>
                    </li>
                    <li>
                      <span className="text-white/40 font-semibold uppercase tracking-wider text-xs">Languages</span>{' '}
                      <span className="text-white ml-2">{CONTACT_INFO.languages}</span>
                    </li>
                    <li>
                      <span className="text-white/40 font-semibold uppercase tracking-wider text-xs">Location</span>{' '}
                      <span className="text-white ml-2">{CONTACT_INFO.location}</span>
                    </li>
                  </ul>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {HERO_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:border-accent hover:text-accent transition-all duration-200"
                      >
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        {label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
