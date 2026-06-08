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
    <section className="relative w-full min-h-[90vh] flex items-center bg-background overflow-hidden border-b border-background-secondary">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-[0.4] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16 items-center relative z-10 w-full py-24 md:py-32">
        {/* Left Side: Minimalist Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="w-10 h-0.5 bg-primary" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
              {t('seniorDev')}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.05] tracking-tight mb-10">
            {t('titleP1')} <br />
            <span className="text-secondary italic">
              <TextRotator words={wordA} />
            </span> 
            <br />
            {t('titleP3')}
            <TextRotator words={wordB} className="underline decoration-2 underline-offset-[16px] decoration-accent" />
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 font-sans max-w-xl leading-relaxed mb-12">
            {t('description')}
          </p>

          <div className="flex flex-wrap gap-8 items-center">
            <a href="#projects">
              <Button variant="primary" className="min-w-[220px]">
                {t('viewProjects')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="#contact" className="group flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-all">
              <span className="border-b-2 border-transparent group-hover:border-primary pb-1">
                {t('contactMe')}
              </span>
              <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Pronounced Rounded Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block h-[620px] w-full"
        >
          {/* Accent Circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          
          {/* Image Container */}
          <div
            className="absolute inset-0 bg-background-secondary rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/ProfilePhotoExtended.png"
              alt="Profile"
              className={`w-full h-full object-cover transition-all duration-1000 ease-out ${hovered ? 'scale-110 saturate-[0.8] brightness-[1.1]' : 'scale-100 saturate-100 brightness-100'
                }`}
            />

            {/* Contact overlay */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-[#2B2A28]/90 via-[#2B2A28]/40 to-transparent backdrop-blur-[2px]"
                >
                  <p className="font-sans text-[11px] text-accent font-bold uppercase tracking-[0.3em] mb-6">
                    {t('contact')}
                  </p>
                  
                  <h3 className="text-4xl font-serif text-white mb-8 leading-tight">
                    {t('seniorDev')}
                  </h3>

                  <ul className="space-y-6 mb-12 text-sm font-sans text-white/80">
                    <li className="flex flex-col gap-1">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-accent/60 font-bold">{t('mail')}</span>
                      <a href={`mailto:${contactInfo.mail}`} className="text-lg text-white hover:text-accent transition-colors font-medium">
                        {contactInfo.mail}
                      </a>
                    </li>
                    <li className="flex flex-col gap-1">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-accent/60 font-bold">{t('location')}</span>
                      <span className="text-lg text-white font-medium">{contactInfo.location}</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    {HERO_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-white/10 hover:bg-primary text-white transition-all duration-300 rounded-2xl border border-white/20 backdrop-blur-md"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
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
