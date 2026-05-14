import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CTASection() {
  const { t } = useLanguage();

  const STATS = [
    { value: '3+',   label: t('cta_stat_1_label') },
    { value: '400+',  label: t('cta_stat_2_label') },
    { value: '100%', label: t('cta_stat_3_label') },
  ];

  return (
    <section className="px-5 md:px-12 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          id="cta-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 px-7 py-14 md:px-14 md:py-18 text-center"
          style={{
            background: 'linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 0% 9%) 50%, hsl(0 0% 3%) 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -10%, hsl(var(--primary) / 0.2) 0%, transparent 65%)' }}
          />

          <div className="relative flex items-center justify-center gap-3 mb-5">
            <span className="block w-8 h-px bg-primary/50" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">{t('cta_eyebrow')}</span>
            <span className="block w-8 h-px bg-primary/50" />
          </div>

          <h2 className="relative font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white mb-4">
            {t('cta_title_1')}{' '}
            <span className="text-primary">{t('cta_title_2')}</span>
          </h2>

          <p className="relative font-mono text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
            {t('cta_subtitle')}
          </p>

          <div className="relative flex flex-wrap justify-center gap-8 md:gap-12 mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-black text-2xl md:text-3xl text-primary">{s.value}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Vi%20seu%20portf%C3%B3lio%20e%20curti%20seu%20trabalho.%20Queria%20conversar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fb558] text-white font-display font-bold text-base md:text-lg tracking-tight px-10 py-5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-[#25D366]/25"
          >
            <WhatsAppIcon />
            {t('cta_button')}
          </a>

          <p className="relative font-mono text-xs text-muted-foreground/50 mt-5">
            {t('cta_footnote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
