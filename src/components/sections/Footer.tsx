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
    href: 'https://www.linkedin.com/in/daniel-r-b1854610b/',
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
    <footer id="contact" aria-label="Site footer" className="bg-background border-t border-[#E4E4E7]">

      {/* ── Pre-footer CTA ───────────────────────────────────────────────── */}
      <div className="section-padding border-b border-[#E4E4E7] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.3] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center relative z-10">

          {/* Left: Headline */}
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#71717A]">
                {t('openTo')}
              </span>
              <span className="h-px w-12 bg-[#0070F3]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-sans text-foreground leading-[1.1] tracking-tight">
              {t('readyToScale')}
              <br />
              <span className="text-[#0070F3]">{t('nextSystem')}</span>
            </h2>
            <p className="text-lg text-[#71717A] font-sans max-w-md leading-relaxed border-l border-[#E4E4E7] pl-6">
              {t('description')}
            </p>
          </div>

          {/* Right: CTA block */}
          <div className="flex flex-col gap-6 lg:items-end w-full lg:w-auto">
            <a
              href={`mailto:${contactInfo.mail}`}
              className="w-full lg:w-auto"
            >
              <Button variant="primary" className="w-full text-sm uppercase tracking-widest px-10">
                {t('startConversation')}
                <ArrowUpRight className="w-5 h-5" />
              </Button>
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-3 px-8 py-3 border border-[#E4E4E7] bg-[#F4F4F5] rounded-[6px] font-sans text-[11px] font-bold uppercase tracking-widest text-foreground hover:border-[#0070F3] hover:text-[#0070F3] transition-all duration-150"
            >
              {t('viewProjects')}
            </a>
          </div>

        </div>
      </div>

      {/* ── Details Block ─────────────────────────────────────────────────── */}
      <div className="py-24 border-b border-[#E4E4E7]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Contact Details */}
          <div className="flex flex-col gap-10">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#71717A]">{t('contact')}</h3>
            <div className="flex flex-col gap-8">
              <p className="text-2xl font-sans text-foreground leading-relaxed tracking-tight pr-12">
                "{contactInfo.bio}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] font-bold">{t('mail')}</span>
                  <a href={`mailto:${contactInfo.mail}`} className="text-base font-sans font-medium text-foreground hover:text-[#0070F3] transition-colors">
                    {contactInfo.mail}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] font-bold">{t('location')}</span>
                  <span className="text-base font-sans font-medium text-foreground">{contactInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-10 lg:items-end">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#71717A]">{t('connect')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              {ACTION_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-6 px-6 py-4 border border-[#E4E4E7] bg-[#F4F4F5] rounded-md text-[11px] font-mono font-bold uppercase tracking-widest text-foreground hover:border-[#0070F3]/50 hover:bg-white transition-all duration-150"
                >
                  {label}
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand Bar ────────────────────────────────────────────────────── */}
      <div className="py-10 bg-[#09090B] text-[#FAFAFA] border-t border-[#27272A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-sans font-bold tracking-tight leading-none">
              Daniel Romero
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAFAFA]/40 font-medium">
              © {year} // Senior Software Engineer
            </span>
          </div>

          <nav>
            <ul className="flex flex-wrap justify-center gap-12">
              {NAV_LINKS.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#FAFAFA]/60 hover:text-white transition-colors duration-150"
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
