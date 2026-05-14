import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const FOTO_URL = 'https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png';

const TOOLS = [
  'After Effects',
  'Premiere Pro',
  'Cinema 4D',
  'Photoshop',
  'Illustrator',
  'Figma',
];

export default function About() {
  const { t } = useLanguage();

  const STATS = [
    { value: '3+',   label: t('about_stat_1_label') },
    { value: '50+',  label: t('about_stat_2_label') },
    { value: '24h',  label: t('about_stat_3_label') },
    { value: '100%', label: t('about_stat_4_label') },
  ];

  const BIO = [t('about_bio_1'), t('about_bio_2'), t('about_bio_3')];

  return (
    <div className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-12">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">{t('about_eyebrow')}</span>
            <span className="block h-px flex-1 max-w-[140px] bg-muted-foreground/30" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 md:items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={FOTO_URL}
                  alt={t('about_name')}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 15%' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                    {t('about_available')}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-base font-bold tracking-tight text-white md:text-lg">
                    {t('about_name')}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/60">
                    {t('hero_role')} · {t('hero_location')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="flex flex-col md:col-span-7"
            >
              <h1 className="font-display text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
                {t('about_title_1')}
                <span
                  className="block italic text-primary"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontWeight: 400,
                    filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.25))',
                  }}
                >
                  {t('about_title_2')}
                </span>
              </h1>

              <div className="mt-6 space-y-2 md:mt-8">
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" />
                  {t('about_role')}
                </p>
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <MapPin className="h-3 w-3 text-primary" />
                  {t('about_location')}
                </p>
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <Calendar className="h-3 w-3 text-primary" />
                  {t('about_years')}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
                <a
                  href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Li%20sobre%20voc%C3%AA%20e%20quero%20conversar%20sobre%20um%20projeto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)]"
                >
                  {t('about_cta_whatsapp')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <Link
                  to="/trabalhos"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-card"
                >
                  {t('about_cta_works')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* MANIFESTO */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto my-16 max-w-4xl border-y border-border/50 px-4 py-12 text-center md:my-24 md:py-20"
        >
          <p
            className="font-display text-3xl leading-tight italic tracking-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
          >
            {t('about_manifesto_1')}
            <br className="hidden md:block" />
            <span className="text-primary"> {t('about_manifesto_2')}</span>
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:mt-8">
            {t('about_manifesto_sign')}
          </p>
        </motion.blockquote>

        {/* BIO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-2xl md:mb-24"
        >
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t('about_story_eyebrow')}
            </span>
          </div>
          <div className="space-y-5 font-mono text-sm leading-relaxed text-foreground/85 md:text-base md:leading-loose">
            {BIO.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid grid-cols-2 gap-3 border-y border-border/50 py-10 sm:grid-cols-4 md:mb-24 md:gap-5 md:py-16"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-4xl font-black tracking-tight text-primary md:text-6xl">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* FERRAMENTAS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              {t('about_tools_eyebrow')}
            </span>
          </div>
          <h2 className="mb-6 font-display text-3xl font-black tracking-tight md:mb-8 md:text-4xl">
            {t('about_tools_title')}
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary md:text-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card/60 to-card/20 p-8 text-center md:p-14"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)',
            }}
          />

          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary md:text-xs">
              {t('about_final_eyebrow')}
            </p>
            <h2 className="mt-5 font-display text-3xl font-black tracking-tight md:text-5xl">
              {t('about_final_title_1')}{' '}
              <span
                className="italic text-primary"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
              >
                {t('about_final_title_2')}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
              {t('about_final_subtitle')}
            </p>
            <a
              href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Li%20sobre%20voc%C3%AA%20e%20quero%20fazer%20um%20projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)]"
            >
              {t('about_cta_whatsapp')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
