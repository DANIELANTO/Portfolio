import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const technologies = [
  { name: 'React', category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', color: '#000000' },
  { name: 'Angular', category: 'Frontend', color: '#DD0031' },
  { name: 'Node.js', category: 'Backend', color: '#339933' },
  { name: 'Nest.js', category: 'Backend', color: '#EA2841' },
  { name: 'FastAPI', category: 'Backend', color: '#009688' },
  { name: 'TypeScript', category: 'Language', color: '#3178C6' },
  { name: 'Python', category: 'Language', color: '#FFD43B' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4' },
  { name: 'PostgreSQL', category: 'Database', color: '#4169E1' },
  { name: 'Azure', category: 'Cloud', color: '#106EBE' },
  { name: 'Docker', category: 'DevOps', color: '#2496ED' },
];

const categoryOrder = [
  'Frontend',
  'Backend',
  'Language',
  'Styling',
  'Database',
  'Cloud',
  'DevOps',
];

const grouped = categoryOrder.reduce<Record<string, typeof technologies>>(
  (acc, cat) => {
    const items = technologies.filter((t) => t.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  },
  {}
);

function TechPill({ tech }: { tech: (typeof technologies)[number] }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        hovered
          ? {
            borderColor: tech.color,
            backgroundColor: `${tech.color}14`,
          }
          : undefined
      }
      className="flex items-center gap-2.5 bg-background border border-foreground/10 rounded-full px-4 py-2 transition-colors duration-200"
    >
      <span
        className="shrink-0 rounded-full"
        style={{ width: 8, height: 8, backgroundColor: tech.color }}
      />
      <span className="text-sm font-medium text-foreground">{tech.name}</span>
    </div>
  );
}

export const TechStack: React.FC = () => {
  const { t } = useTranslation(['techstack']);
  return (
    <section className="py-24 bg-muted border-b border-foreground/10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <motion.div 
          className="mb-14"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-5xl font-bold text-foreground uppercase tracking-normal mb-3">
            {t('title1')} <span className="text-secondary">{t('title2')}</span>
          </h2>
          <p className="text-xl text-foreground/60 font-medium max-w-xl">
            {t('description')}
          </p>
        </motion.div>

        {/* Category rows */}
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([category, techs], index) => (
            <motion.div 
              key={category} 
              className="flex flex-col sm:flex-row sm:gap-8"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.05
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Left: category label */}
              <div className="sm:w-28 shrink-0 mb-2 sm:mb-0 pt-1.5">
                <span className="text-sm uppercase tracking-widest text-foreground/50 font-medium">
                  {t(`categories.${category}`, { defaultValue: category })}
                </span>
              </div>

              {/* Right: pills */}
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <TechPill key={tech.name} tech={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
