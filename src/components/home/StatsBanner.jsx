import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import AnimatedNumber from '../common/AnimatedNumber';

export default function StatsBanner() {
  const { t } = useLanguage();

  const STATS = [
    {
      icon: TrendingUp,
      value: '2.6×',
      labelKey: 'stats_1_label',
      sourceKey: 'stats_1_source',
    },
    {
      icon: Eye,
      value: '85%',
      labelKey: 'stats_2_label',
      sourceKey: 'stats_2_source',
    },
    {
      icon: Zap,
      value: '1.8s',
      labelKey: 'stats_3_label',
      sourceKey: 'stats_3_source',
    },
  ];

  return (
    <section className="relative px-5 py-10 md:px-12 md:py-14">
      {/* Divisória elegante no topo (gradient sutil) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
              {t('stats_eyebrow')}
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {t('stats_title_1')}<br className="hidden md:block" />
            <span
              className="italic text-primary"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
            >
              {' '}{t('stats_title_2')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-[0_8px_28px_-12px_rgba(255,255,255,0.18)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-4xl font-black tracking-tight text-primary tabular-nums md:text-5xl">
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="mt-1 font-display text-sm font-bold tracking-tight text-foreground md:text-base">
                  {t(s.labelKey)}
                </p>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground/70">
                  {t(s.sourceKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
