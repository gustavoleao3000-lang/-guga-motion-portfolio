import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Send, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProcessSection() {
  const { t } = useLanguage();

  const STEPS = [
    {
      n: '01',
      icon: Sparkles,
      titleKey: 'process_step_1_title',
      timeKey: 'process_step_1_time',
      descKey: 'process_step_1_desc',
    },
    {
      n: '02',
      icon: Wand2,
      titleKey: 'process_step_2_title',
      timeKey: 'process_step_2_time',
      descKey: 'process_step_2_desc',
    },
    {
      n: '03',
      icon: Send,
      titleKey: 'process_step_3_title',
      timeKey: 'process_step_3_time',
      descKey: 'process_step_3_desc',
    },
  ];

  return (
    <section className="border-t border-border/30 px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-7 md:mb-10"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t('process_eyebrow')}
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {t('process_title_1')}<br className="hidden md:block" />
            <span className="text-primary"> {t('process_title_2')}</span>
          </h2>
          <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
            {t('process_subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[42px] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-display text-2xl font-black text-primary/30">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                    {t(s.titleKey)}
                  </h3>

                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      {t(s.timeKey)}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                    {t(s.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
