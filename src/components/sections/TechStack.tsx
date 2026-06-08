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
  return (
    <div
      className="flex items-center gap-3 bg-[#F4F4F5] border border-[#E4E4E7] rounded-md px-4 py-2.5 transition-all duration-150 ease-out cursor-default hover:border-[#0070F3]/50 hover:bg-white"
    >
      <div 
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: tech.color }}
      />
      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#09090B]/80">{tech.name}</span>
    </div>
  );
}

export const TechStack: React.FC = () => {
  const { t } = useTranslation(['techstack']);
  return (
    <section className="section-padding bg-background border-b border-background-secondary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div 
          className="mb-24 flex flex-col md:flex-row md:items-center justify-between gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-[#0070F3]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#71717A]">
                {t('title1')}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-sans text-foreground tracking-tight leading-tight">
              {t('title2')}
            </h2>
          </div>
          <p className="text-lg text-[#71717A] font-sans max-w-sm leading-relaxed border-l border-[#E4E4E7] pl-6 pb-2">
            {t('description')}
          </p>
        </motion.div>

        {/* Category rows */}
        <div className="flex flex-col gap-20">
          {Object.entries(grouped).map(([category, techs], index) => (
            <motion.div 
              key={category} 
              className="flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start"
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
              <div className="pt-2">
                <span className="font-mono text-[11px] uppercase font-bold tracking-[0.3em] text-[#0070F3]/70">
                  {t(`categories.${category}`, { defaultValue: category })}
                </span>
              </div>

              {/* Right: pills */}
              <div className="flex flex-wrap gap-4">
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
