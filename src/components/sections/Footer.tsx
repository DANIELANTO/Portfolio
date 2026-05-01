import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    <footer id="contact" aria-label="Site footer">

      {/* ── Pre-footer CTA ───────────────────────────────────────────────── */}
      <div className="bg-foreground border-b-8 border-accent">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Headline */}
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
              {t('openTo')}
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              {t('readyToScale')}
              <br />
              <span className="text-accent">{t('nextSystem')}</span>
            </h2>
            <p className="mt-5 text-white/60 text-base max-w-md leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Right: CTA block */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-4 lg:justify-end">
            <a
              href={`mailto:${contactInfo.mail}`}
              aria-label="Send me an email"
              className="
                inline-flex items-center gap-3 px-8 py-4
                bg-accent text-foreground
                font-bold text-base tracking-wide
                transition-all duration-200
                hover:brightness-110 hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              {t('startConversation')}
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              aria-label="View my projects"
              className="
                inline-flex items-center gap-3 px-8 py-4
                bg-transparent text-white border-2 border-white/20
                font-bold text-base tracking-wide
                transition-all duration-200
                hover:border-white/60 hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              {t('viewProjects')}
            </a>
          </div>

        </div>
      </div>

      {/* ── Contact Info Block ────────────────────────────────────────────── */}
      <div className="bg-foreground border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Bio + details */}
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">{t('contact')}</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg mb-6">
              {contactInfo.bio}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-white/40 font-semibold uppercase tracking-wider text-xs w-20 shrink-0 pt-0.5">{t('mail')}</span>
                <a
                  href={`mailto:${contactInfo.mail}`}
                  className="text-accent hover:underline"
                >
                  {contactInfo.mail}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="text-white/40 font-semibold uppercase tracking-wider text-xs w-20 shrink-0 pt-0.5">{t('phone')}</span>
                <span className="text-white">{contactInfo.phone}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-white/40 font-semibold uppercase tracking-wider text-xs w-20 shrink-0 pt-0.5">{t('languages')}</span>
                <span className="text-white">English, Spanish</span>
              </li>
              <li className="flex gap-2">
                <span className="text-white/40 font-semibold uppercase tracking-wider text-xs w-20 shrink-0 pt-0.5">{t('location')}</span>
                <span className="text-white">{contactInfo.location}</span>
              </li>
            </ul>
          </div>

          {/* Right: Action buttons */}
          <div className="flex flex-col justify-start lg:items-end gap-3">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
              {t('connect')}
            </p>
            {ACTION_LINKS.map(({ label, href, accentClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className={`
                  inline-flex items-center gap-2 px-6 py-2.5
                  border border-white/20 text-white/60
                  text-xs font-bold tracking-widest
                  transition-all duration-200
                  ${accentClass}
                `}
              >
                {label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="bg-foreground border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand */}
          <address className="not-italic flex flex-col items-center md:items-start gap-1">
            <span className="text-2xl font-extrabold tracking-tighter text-white">
              PORTFOLIO<span className="text-accent">.</span>
            </span>
            <span className="text-white/40 text-sm">
              © {year} {t('rights')}
            </span>
          </address>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    className="text-white/50 text-sm font-medium hover:text-white transition-colors duration-150"
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
