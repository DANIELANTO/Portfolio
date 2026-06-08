import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { ArrowRight, ExternalLink, GitBranch, Mail } from 'lucide-react';
import { TextRotator } from '../ui/TextRotator';

// ─── Contact overlay data ─────────────────────────────────────────────────────

const getContactInfo = (t: any) => ({
  bio: t('description'),
  mail: 'danred001@gmail.com',
  phone: '+503 75392732',
  languages: t('hero:languages', { defaultValue: 'English, Spanish' }), // Using fallback if needed, but we have it translated. Wait, we don't have the value "English, Spanish" in translation, we only have the label. I'll just hardcode the value or use a key if needed. The translation strings only have the labels.
  // Actually, we can just return what's needed. Let's just pass `t` and build the object.
  location: 'La Libertad, El Salvador',
});

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
    href: `mailto:danred001@gmail.com`,
    icon: Mail,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const Hero: React.FC = () => {
  const { t } = useTranslation(['hero']);
  const [hovered, setHovered] = useState(false);

  const contactInfo = getContactInfo(t);

  const wordA = t('wordA', { returnObjects: true }) as string[];
  const wordB = t('wordB', { returnObjects: true }) as string[];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden border-b border-border">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(var(--color-primary) 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center relative z-10 w-full py-32 md:py-44">
        {/* Left Side: Editorial Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-start text-center lg:text-left"
        >
          <div className="mb-8 flex items-center gap-4 w-full lg:w-auto">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              {t('seniorDev')}
            </span>
            <span className="h-px flex-1 lg:w-12 bg-border" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] tracking-tight mb-8">
            {t('titleP1')} <br />
            <span className="italic text-primary">
              <TextRotator words={wordA} />
            </span> 
            <br />
            {t('titleP3')}
            <TextRotator words={wordB} className="underline decoration-1 underline-offset-[12px] decoration-border" />
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-lg leading-relaxed mb-12 mx-auto lg:mx-0">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-4 w-full lg:w-auto">
            <a href="#projects">
              <Button variant="primary" className="min-w-[200px]">
                {t('viewProjects')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#contact" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors py-3 px-2">
              {t('contactMe')}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Refined Photo Frame */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block h-[600px] w-full"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 border-t border-r border-border" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-b border-l border-border" />
          
          {/* Image Container */}
          <div
            className="absolute inset-0 bg-card border border-border overflow-hidden shadow-sm group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/ProfilePhotoExtended.png"
              alt="Profile"
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${hovered ? 'scale-105 opacity-20' : 'scale-100 opacity-100'
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
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-center p-12 bg-white/50 backdrop-blur-sm"
                >
                  <p className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6">
                    {t('contact')}
                  </p>
                  
                  <h3 className="text-3xl font-serif text-foreground mb-6 leading-tight">
                    {t('seniorDev')}
                  </h3>

                  <ul className="space-y-4 mb-10 text-sm font-sans text-muted-foreground">
                    <li className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{t('mail')}</span>
                      <a href={`mailto:${contactInfo.mail}`} className="text-foreground hover:text-primary transition-colors">
                        {contactInfo.mail}
                      </a>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{t('location')}</span>
                      <span className="text-foreground">{contactInfo.location}</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    {HERO_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border bg-white text-foreground hover:border-primary hover:text-primary transition-all duration-300 rounded-none shadow-sm"
                        aria-label={label}
                      >
                        <Icon className="w-4 h-4" />
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
