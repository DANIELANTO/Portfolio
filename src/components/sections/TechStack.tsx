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
      className="flex items-center gap-3 bg-white border border-border rounded-none px-4 py-3 transition-all duration-200 ease-out cursor-default hover:border-primary hover:-translate-y-0.5"
    >
      <div 
        className="w-1.5 h-1.5 rounded-none rotate-45"
        style={{ backgroundColor: tech.color }}
      />
      <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-foreground/80">{tech.name}</span>
    </div>
  );
}

export const TechStack: React.FC = () => {
  const { t } = useTranslation(['techstack']);
  return (
    <section className="section-padding bg-muted/30 border-b border-border relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div 
          className="mb-24 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="mb-6 flex items-center gap-4 w-full">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              {t('title1')}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-foreground tracking-tight mb-8">
            {t('title2')}
          </h2>
          <p className="text-lg text-muted-foreground font-sans max-w-xl italic mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Category rows */}
        <div className="flex flex-col gap-16">
          {Object.entries(grouped).map(([category, techs], index) => (
            <motion.div 
              key={category} 
              className="flex flex-col md:flex-row gap-8 md:gap-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: 'easeOut',
                delay: index * 0.05
              }}
              viewport={{ once: true }}
            >
              {/* Left: category label */}
              <div className="md:w-32 shrink-0 pt-1">
                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.3em] text-primary">
                  {t(`categories.${category}`, { defaultValue: category })}
                </span>
              </div>

              {/* Right: pills */}
              <div className="flex flex-wrap gap-4 flex-1">
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
