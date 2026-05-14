import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const WHATSAPP = '5562998744360';

function PriceDisplay({ pkg, t }) {
  if (pkg.priceTo) {
    return (
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          {t('pkg_price_from')}
        </p>
        <p className="mt-1 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
          {pkg.priceFrom}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {t('pkg_price_until')} <span className="text-foreground/85">{pkg.priceTo}</span>
        </p>
      </div>
    );
  }
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        {t('pkg_price_investment')}
      </p>
      <p className="mt-1 font-display text-2xl font-black tracking-tight text-foreground md:text-3xl">
        {pkg.priceFrom}
      </p>
      {pkg.priceFootnote && (
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {pkg.priceFootnote}
        </p>
      )}
    </div>
  );
}

function PackageCard({ pkg, index, t }) {
  const isFeatured = pkg.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 md:p-8 ${
        isFeatured
          ? 'border border-primary/70 bg-gradient-to-b from-primary/[0.07] via-card to-card shadow-[0_0_40px_-12px_rgba(255,255,255,0.45)] md:-mt-3 md:pb-10'
          : 'border border-border bg-card/60 hover:border-primary/40 hover:bg-card'
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-background px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            <Sparkles className="h-3 w-3 fill-primary" />
            {t('pkg_badge_featured')}
          </span>
        </div>
      )}

      <div className="mb-5">
        <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground" />
          <span className={isFeatured ? 'text-primary' : 'text-muted-foreground/80'}>
            {pkg.eyebrow}
          </span>
        </p>
        <h3 className="mt-2 font-display text-2xl font-black tracking-tight md:text-3xl">
          {t('pkg_pack_label')}{' '}
          <span className={isFeatured ? 'text-primary' : 'text-foreground'}>{pkg.name}</span>
        </h3>
      </div>

      <div className="mb-6 border-b border-border pb-6">
        <PriceDisplay pkg={pkg} t={t} />
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                isFeatured ? 'bg-primary/25' : 'bg-muted-foreground/15'
              }`}
            >
              <Check
                className={`h-2.5 w-2.5 ${isFeatured ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={3}
              />
            </span>
            <span className="font-mono text-xs leading-relaxed text-foreground/85">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <p className="mb-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {pkg.note}
      </p>

      <a
        href={`https://wa.me/${WHATSAPP}?text=${pkg.whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
          isFeatured
            ? 'bg-[#25D366] text-white hover:bg-[#1FB558] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)]'
            : 'border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/15'
        }`}
      >
        {pkg.cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
      </a>
    </motion.div>
  );
}

export default function PackagesSection() {
  const { t } = useLanguage();

  const PACKAGES = [
    {
      id: 'start',
      name: 'Start',
      eyebrow: t('pkg_start_eyebrow'),
      priceFrom: 'R$ 450',
      priceTo: 'R$ 800',
      priceFootnote: null,
      features: [
        t('pkg_start_f1'),
        t('pkg_start_f2'),
        t('pkg_start_f3'),
        t('pkg_start_f4'),
        t('pkg_start_f5'),
      ],
      note: t('pkg_start_note'),
      cta: t('pkg_start_cta'),
      whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20Pack%20Start.%20Pode%20me%20mandar%20detalhes%3F',
      featured: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      eyebrow: t('pkg_pro_eyebrow'),
      priceFrom: 'R$ 1.500',
      priceTo: 'R$ 2.800',
      priceFootnote: null,
      features: [
        t('pkg_pro_f1'),
        t('pkg_pro_f2'),
        t('pkg_pro_f3'),
        t('pkg_pro_f4'),
        t('pkg_pro_f5'),
        t('pkg_pro_f6'),
      ],
      note: t('pkg_pro_note'),
      cta: t('pkg_pro_cta'),
      whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20Pack%20Pro.%20Pode%20me%20mandar%20detalhes%3F',
      featured: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      eyebrow: t('pkg_premium_eyebrow'),
      priceFrom: t('pkg_premium_price'),
      priceTo: null,
      priceFootnote: t('pkg_premium_footnote'),
      features: [
        t('pkg_premium_f1'),
        t('pkg_premium_f2'),
        t('pkg_premium_f3'),
        t('pkg_premium_f4'),
        t('pkg_premium_f5'),
      ],
      note: t('pkg_premium_note'),
      cta: t('pkg_premium_cta'),
      whatsappMsg: 'Oi%20Guga%2C%20tenho%20um%20projeto%20Premium%20pra%20conversar.',
      featured: false,
    },
  ];

  return (
    <section id="pacotes" className="border-t border-border/40 px-5 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t('pkg_eyebrow')}
            </span>
            <span className="block h-px flex-1 max-w-[60px] bg-muted-foreground/30" />
          </div>
          <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
            {t('pkg_title_1')}<br className="hidden md:block" />
            <span className="text-primary"> {t('pkg_title_2')}</span>
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            {t('pkg_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} t={t} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-14"
        >
          <a
            href={`https://wa.me/${WHATSAPP}?text=Oi%20Guga%2C%20quero%20um%20or%C3%A7amento.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] sm:w-auto"
          >
            {t('pkg_cta_main')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="/trabalhos"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-card sm:w-auto"
          >
            <Play className="h-3 w-3 fill-current" />
            {t('pkg_cta_secondary')}
          </a>
        </motion.div>

        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground/60">
          {t('pkg_footnote')}
        </p>
      </div>
    </section>
  );
}
