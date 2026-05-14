import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`overflow-hidden rounded-2xl border bg-card/50 transition-colors duration-300 ${
        isOpen ? 'border-primary/40' : 'border-border/50 hover:border-primary/30'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
        aria-expanded={isOpen}
      >
        <span className="font-display text-sm font-bold tracking-tight text-foreground md:text-base">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
            isOpen
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border/60 text-muted-foreground'
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 font-mono text-xs leading-relaxed text-muted-foreground md:px-6 md:pb-6 md:text-sm">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const { t } = useLanguage();
  const [openSet, setOpenSet] = useState(() => new Set());

  const FAQS = [
    { q: t('faq_1_q'), a: t('faq_1_a') },
    { q: t('faq_2_q'), a: t('faq_2_a') },
    { q: t('faq_3_q'), a: t('faq_3_a') },
    { q: t('faq_4_q'), a: t('faq_4_a') },
    { q: t('faq_5_q'), a: t('faq_5_a') },
  ];

  const toggle = (idx) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section id="faq" className="border-t border-border/30 px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-4xl">
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
              {t('faq_eyebrow')}
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {t('faq_title_1')}<br className="hidden md:block" />
            <span className="text-primary"> {t('faq_title_2')}</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              index={i}
              isOpen={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          {t('faq_help')}{' '}
          <a
            href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20teu%20trabalho."
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] underline-offset-4 transition-colors hover:underline"
          >
            {t('faq_link')}
          </a>
        </p>
      </div>
    </section>
  );
}
