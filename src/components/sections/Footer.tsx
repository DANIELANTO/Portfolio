import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

// ─── Data ────────────────────────────────────────────────────────────────────

const getContactInfo = (t: any) => ({
  bio: t('hero:description'),
  mail: 'danred001@gmail.com',
  phone: '+503 75392732',
  languages: 'English, Spanish',
  location: 'La Libertad, El Salvador',
});

const ACTION_LINKS = [
  {
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/daniel-reyes-01/',
    accentClass: 'hover:border-primary hover:text-primary',
  },
  {
    label: 'GITHUB',
    href: 'https://github.com/danred001',
    accentClass: 'hover:border-secondary hover:text-secondary',
  },
  {
    label: 'EMAIL',
    href: `mailto:danred001@gmail.com`,
    accentClass: 'hover:border-accent hover:text-accent',
  },
  {
    label: 'WHATSAPP',
    href: `https://wa.me/50375392732`,
    accentClass: 'hover:border-green-400 hover:text-green-400',
  },
] as const;

const NAV_LINKS = [
  { labelKey: 'Projects', href: '#projects' },
  { labelKey: 'Tech Stack', href: '#techstack' },
  { labelKey: 'Contact', href: '#contact' },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export const Footer: React.FC = () => {
  const { t } = useTranslation(['footer', 'hero']);
  const year = new Date().getFullYear();
  const contactInfo = getContactInfo(t);

  return (
    <footer id="contact" aria-label="Site footer" className="bg-background border-t border-border">

      {/* ── Pre-footer CTA ───────────────────────────────────────────────── */}
      <div className="section-padding border-b border-border relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left: Headline */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                {t('openTo')}
              </span>
              <span className="h-px w-12 bg-border" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-foreground leading-tight tracking-tight">
              {t('readyToScale')}
              <br />
              <span className="italic text-primary">{t('nextSystem')}</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans max-w-md leading-relaxed italic">
              {t('description')}
            </p>
          </div>

          {/* Right: CTA block */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:items-end">
            <a
              href={`mailto:${contactInfo.mail}`}
              className="min-w-[240px]"
            >
              <Button variant="primary" className="w-full text-xs font-mono uppercase tracking-[0.2em]">
                {t('startConversation')}
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-3 px-8 py-3 border border-border bg-white font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 min-h-[44px]"
            >
              {t('viewProjects')}
            </a>
          </div>

        </div>
      </div>

      {/* ── Details Block ─────────────────────────────────────────────────── */}
      <div className="py-24 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Contact Details */}
          <div className="flex flex-col gap-10">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{t('contact')}</h3>
            <div className="flex flex-col gap-8">
              <p className="text-xl font-serif text-muted-foreground leading-relaxed italic pr-12">
                "{contactInfo.bio}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{t('mail')}</span>
                  <a href={`mailto:${contactInfo.mail}`} className="text-sm font-sans font-medium hover:text-primary transition-colors">
                    {contactInfo.mail}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{t('location')}</span>
                  <span className="text-sm font-sans font-medium">{contactInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-10 lg:items-end">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary">{t('connect')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {ACTION_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-6 px-6 py-4 border border-border bg-white text-[10px] font-mono font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 min-h-[44px]"
                >
                  {label}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand Bar ────────────────────────────────────────────────────── */}
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-3xl font-serif italic text-foreground leading-none">
              Daniel Romero
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
              © {year} // Senior Software Engineer
            </span>
          </div>

          <nav>
            <ul className="flex flex-wrap justify-center gap-12">
              {NAV_LINKS.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-foreground/40 hover:text-primary transition-colors duration-300"
                  >
                    {t(`nav.${labelKey}`, { defaultValue: labelKey })}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
