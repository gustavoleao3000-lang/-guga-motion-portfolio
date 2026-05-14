import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Globe, FileCheck, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const FOTO_URL = 'https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png';
const WHATSAPP = '5562998744360';

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', message: '' });
  const [projectType, setProjectType] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const TYPES = [
    { id: 'reel',     label: t('contact_type_reel') },
    { id: 'brand',    label: t('contact_type_brand') },
    { id: 'campaign', label: t('contact_type_campaign') },
    { id: 'vinheta',  label: t('contact_type_vinheta') },
    { id: 'other',    label: t('contact_type_other') },
  ];

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const canSubmit = form.name.trim() && form.message.trim();

  const handleWhatsApp = () => {
    if (!canSubmit) return;
    const typeLabel = projectType
      ? TYPES.find((tp) => tp.id === projectType)?.label
      : null;
    const lines = [
      `Oi, Guga! Me chamo ${form.name}.`,
      typeLabel ? `Tipo de projeto: ${typeLabel}` : null,
      '',
      form.message,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-5xl px-5 md:px-12">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* HEADER */}
              <div className="mb-8 md:mb-12">
                <div className="mb-4 flex items-center gap-3 md:mb-6">
                  <span className="block h-px w-6 bg-primary" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">
                    {t('contact_eyebrow')}
                  </span>
                  <span className="block h-px flex-1 max-w-[120px] bg-muted-foreground/30" />
                </div>
                <h1 className="font-display text-4xl font-black leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                  {t('contact_title_1')}
                  <span
                    className="block italic text-primary"
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontWeight: 400,
                      filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.2))',
                    }}
                  >
                    {t('contact_title_2')}
                  </span>
                </h1>
                <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
                  {t('contact_subtitle')}
                </p>
              </div>

              {/* WHATSAPP CARD — caminho principal */}
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                href={`https://wa.me/${WHATSAPP}?text=Oi%2C%20Guga!%20Quero%20conversar%20sobre%20um%20projeto%20de%20motion%20design.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-8 flex items-center gap-4 rounded-2xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/[0.08] via-card to-card p-4 transition-all duration-300 hover:border-[#25D366]/60 hover:shadow-[0_0_40px_-12px_rgba(37,211,102,0.4)] md:gap-5 md:p-6"
              >
                {/* Foto */}
                <div className="relative flex-shrink-0">
                  <img
                    src={FOTO_URL}
                    alt="Guga"
                    className="h-14 w-14 rounded-full border-2 border-[#25D366]/40 object-cover md:h-16 md:w-16"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/60 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366] ring-2 ring-background" />
                  </span>
                </div>
                {/* Texto */}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold tracking-tight text-foreground md:text-lg">
                    {t('contact_whatsapp_title')}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_whatsapp_subtitle')}
                  </p>
                </div>
                {/* CTA arrow */}
                <div className="hidden flex-shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all group-hover:bg-[#1FB558] sm:inline-flex">
                  <WhatsAppIcon className="h-4 w-4" />
                  {t('contact_whatsapp_cta')}
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#25D366] transition-transform duration-300 group-hover:translate-x-0.5 sm:hidden" />
              </motion.a>

              {/* Pré-briefing CTA (caminho qualificado) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mb-8"
              >
                <Link
                  to="/briefing"
                  className="group flex items-center gap-4 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.06] via-card to-card p-4 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_40px_-12px_rgba(255,255,255,0.4)] md:gap-5 md:p-6"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 transition-colors group-hover:bg-primary/25 md:h-14 md:w-14">
                    <ClipboardList className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-bold tracking-tight text-foreground md:text-lg">
                      {t('contact_briefing_cta')}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                      {t('contact_briefing_subtitle')}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4 md:my-10">
                <div className="h-px flex-1 bg-border/50" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 md:text-xs">
                  {t('contact_divider')}
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border border-border bg-card/40 p-6 md:p-10"
              >
                {/* Project type */}
                <div className="mb-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_project_type')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((tp) => (
                      <button
                        key={tp.id}
                        onClick={() => setProjectType(projectType === tp.id ? null : tp.id)}
                        type="button"
                        className={`inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 md:text-xs ${
                          projectType === tp.id
                            ? 'border border-primary bg-primary text-primary-foreground'
                            : 'border border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        {tp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_name_label')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('contact_name_placeholder')}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    className="w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3.5 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/60 focus:bg-background"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_message_label')}
                  </label>
                  <textarea
                    placeholder={t('contact_message_placeholder')}
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-border/60 bg-background/40 px-4 py-3.5 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/60 focus:bg-background"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleWhatsApp}
                  disabled={!canSubmit}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none md:text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t('contact_send')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </motion.div>

              {/* INFO STRIP */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-10"
              >
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3">
                  <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_footer_response')}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3">
                  <Globe className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_footer_remote')}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3">
                  <FileCheck className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {t('contact_footer_quote')}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="py-16 text-center md:py-24"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 180 }}
                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 md:h-24 md:w-24"
              >
                <CheckCircle className="h-10 w-10 text-[#25D366] md:h-12 md:w-12" />
              </motion.div>
              <h2 className="font-display text-5xl font-black leading-none tracking-tight md:text-7xl">
                {t('contact_success_title')}
              </h2>
              <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
                {t('contact_success_subtitle')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
