import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, Check, ArrowRight, CheckCircle, Home } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const WHATSAPP = '5562998744360';

const STEPS = [
  { key: 'name',          type: 'text',     required: true },
  { key: 'whatsapp',      type: 'text',     required: true },
  { key: 'email',         type: 'email',    required: true },
  { key: 'identifies_as', type: 'radio',    required: true, optionsKey: ['briefing_q4_o1', 'briefing_q4_o2', 'briefing_q4_o3'] },
  { key: 'company_site',  type: 'text',     required: true },
  { key: 'challenge',     type: 'textarea', required: true },
  { key: 'items',         type: 'checkbox', required: true, optionsKey: ['briefing_q7_o1', 'briefing_q7_o2', 'briefing_q7_o3', 'briefing_q7_o4', 'briefing_q7_o5', 'briefing_q7_o6'] },
  { key: 'investment',    type: 'radio',    required: true, optionsKey: ['briefing_q8_o1', 'briefing_q8_o2', 'briefing_q8_o3', 'briefing_q8_o4'] },
  { key: 'source',        type: 'radio',    required: true, optionsKey: ['briefing_q9_o1', 'briefing_q9_o2', 'briefing_q9_o3', 'briefing_q9_o4', 'briefing_q9_o5'] },
  { key: 'timeline',      type: 'select',   required: true, optionsKey: ['briefing_q10_o1', 'briefing_q10_o2', 'briefing_q10_o3', 'briefing_q10_o4'] },
];

const TOTAL = STEPS.length;

function isValid(step, value) {
  if (!step.required) return true;
  if (step.type === 'checkbox') return Array.isArray(value) && value.length > 0;
  if (step.type === 'email') return /.+@.+\..+/.test(String(value || ''));
  if (step.type === 'radio' || step.type === 'select') {
    // Pra radio/select, value pode ser 0 (primeira opção) — não usar `|| ''` que trata 0 como falsy
    return value !== null && value !== undefined && value !== '';
  }
  // text, textarea
  return typeof value === 'string' && value.trim().length > 0;
}

export default function Briefing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [phase, setPhase] = useState('welcome'); // welcome | form | thanks
  const [current, setCurrent] = useState(0); // 0..9
  const [answers, setAnswers] = useState({
    name: '',
    whatsapp: '',
    email: '',
    identifies_as: '',
    company_site: '',
    challenge: '',
    items: [],
    investment: '',
    source: '',
    timeline: '',
  });

  const step = STEPS[current];
  const value = answers[step?.key];
  const valid = step ? isValid(step, value) : false;
  const progressCount = STEPS.filter((s) => isValid(s, answers[s.key])).length;
  const progressPct = (progressCount / TOTAL) * 100;

  const setAnswer = (key, v) => setAnswers((prev) => ({ ...prev, [key]: v }));

  const next = () => {
    if (!valid) return;
    if (current < TOTAL - 1) setCurrent(current + 1);
    else setPhase('thanks');
  };
  const back = () => {
    if (current > 0) setCurrent(current - 1);
    else setPhase('welcome');
  };

  const sendWhatsApp = () => {
    const itemsLabel = (answers.items || [])
      .map((idx) => t(`briefing_q7_o${idx + 1}`))
      .join(', ');

    const lines = [
      `*Pré-briefing — ${answers.name}*`,
      '',
      `📱 *WhatsApp:* ${answers.whatsapp}`,
      `✉️ *Email:* ${answers.email}`,
      `👤 *Perfil:* ${t(`briefing_q4_o${answers.identifies_as + 1}`)}`,
      `🔗 *Site/Insta:* ${answers.company_site}`,
      '',
      `🎯 *Desafio:*`,
      answers.challenge,
      '',
      `📦 *Itens necessários:* ${itemsLabel}`,
      `💰 *Investimento:* ${t(`briefing_q8_o${answers.investment + 1}`)}`,
      `🔎 *Origem:* ${t(`briefing_q9_o${answers.source + 1}`)}`,
      `⏰ *Prazo:* ${t(`briefing_q10_o${answers.timeline + 1}`)}`,
    ];
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank');
  };

  /* ============ WELCOME ============ */
  if (phase === 'welcome') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-5 pt-24 pb-12 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="block h-px w-6 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Pré-briefing
            </span>
            <span className="block h-px w-6 bg-primary" />
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {t('briefing_welcome_title')}
          </h1>
          <p
            className="mt-4 font-display text-2xl italic leading-tight tracking-tight text-primary md:mt-6 md:text-4xl"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}
          >
            {t('briefing_welcome_subtitle')}
          </p>

          <p className="mx-auto mt-6 max-w-md font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
            10 perguntas rápidas · 2 minutos · 100% confidencial
          </p>

          <button
            onClick={() => setPhase('form')}
            className="group mt-10 inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] md:text-sm"
          >
            <ArrowRight className="h-4 w-4" />
            {t('briefing_start')}
          </button>
        </motion.div>
      </div>
    );
  }

  /* ============ THANKS ============ */
  if (phase === 'thanks') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-5 pt-24 pb-12 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 180 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 md:h-24 md:w-24"
          >
            <CheckCircle className="h-10 w-10 text-[#25D366] md:h-12 md:w-12" />
          </motion.div>

          <h1 className="font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {t('briefing_thanks_title')}
          </h1>
          <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-base">
            {t('briefing_thanks_subtitle')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={sendWhatsApp}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FB558] hover:shadow-[0_0_32px_rgba(37,211,102,0.5)] sm:w-auto"
            >
              {t('briefing_thanks_send')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-card sm:w-auto"
            >
              <Home className="h-3.5 w-3.5" />
              {t('briefing_thanks_back')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ============ FORM (multi-step) ============ */
  return (
    <div className="min-h-screen px-5 pt-24 pb-32 md:px-12 md:pt-28">
      <div className="mx-auto max-w-2xl">
        {/* Voltar */}
        <button
          onClick={back}
          className="group mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground md:mb-8"
        >
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          {t('briefing_back')}
        </button>

        {/* Animated question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Question */}
            <h2 className="font-display text-2xl font-black leading-tight tracking-tight md:text-4xl">
              <span className="font-mono text-base font-normal text-muted-foreground md:text-xl">
                {current + 1}.
              </span>{' '}
              {t(`briefing_q${current + 1}`)}
              {step.required && <span className="text-primary"> *</span>}
            </h2>

            {/* Input area */}
            <div className="mt-6 md:mt-8">
              <QuestionInput
                step={step}
                value={value}
                onChange={(v) => setAnswer(step.key, v)}
                onNext={next}
                t={t}
              />
            </div>

            {/* Hint */}
            {(() => {
              const hint = t(`briefing_q${current + 1}_hint`);
              if (hint && hint !== `briefing_q${current + 1}_hint`) {
                return (
                  <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {hint}
                  </p>
                );
              }
              return null;
            })()}

            {/* Próximo */}
            <button
              onClick={next}
              disabled={!valid}
              className={`mt-8 inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 md:text-sm ${
                valid
                  ? 'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-foreground hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]'
                  : 'cursor-not-allowed border border-border bg-card/40 text-muted-foreground/60'
              }`}
            >
              <ArrowDown className="h-3.5 w-3.5" />
              {t('briefing_next')}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar fixo no rodapé */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-5 py-3 md:px-12 md:py-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
            <span>
              {progressCount} <span className="text-foreground/60">de</span> {TOTAL}{' '}
              {t('briefing_progress')}
            </span>
            <span className="text-primary">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-card">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-primary"
              style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   QUESTION INPUT — renderiza conforme tipo
   ============================================================ */
function QuestionInput({ step, value, onChange, onNext, t }) {
  const placeholder = t(`briefing_q${STEPS.indexOf(step) + 1}_placeholder`);

  // Texto
  if (step.type === 'text' || step.type === 'email') {
    return (
      <input
        type={step.type}
        autoFocus
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value && isValid(step, value)) {
            e.preventDefault();
            onNext();
          }
        }}
        placeholder={placeholder !== `briefing_q${STEPS.indexOf(step) + 1}_placeholder` ? placeholder : ''}
        className="w-full rounded-xl border border-border bg-card/40 px-4 py-4 font-mono text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/60 focus:bg-card md:text-lg"
      />
    );
  }

  // Textarea
  if (step.type === 'textarea') {
    return (
      <textarea
        autoFocus
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder={placeholder !== `briefing_q${STEPS.indexOf(step) + 1}_placeholder` ? placeholder : ''}
        className="w-full resize-none rounded-xl border border-border bg-card/40 px-4 py-4 font-mono text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary/60 focus:bg-card md:text-lg"
      />
    );
  }

  // Radio (single select)
  if (step.type === 'radio') {
    return (
      <div className="flex flex-col gap-2.5">
        {step.optionsKey.map((optKey, idx) => {
          const selected = value === idx;
          return (
            <button
              key={optKey}
              onClick={() => onChange(idx)}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-4 text-left font-mono text-sm transition-all duration-200 md:px-5 md:py-5 md:text-base ${
                selected
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-card/40 text-foreground/85 hover:border-primary/40 hover:bg-card'
              }`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? 'border-primary' : 'border-muted-foreground/40 group-hover:border-foreground/50'
                }`}
              >
                {selected && <span className="block h-2 w-2 rounded-full bg-primary" />}
              </span>
              <span className="flex-1">{t(optKey)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Checkbox (multi-select)
  if (step.type === 'checkbox') {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (idx) => {
      if (selected.includes(idx)) onChange(selected.filter((i) => i !== idx));
      else onChange([...selected, idx]);
    };
    return (
      <div className="flex flex-col gap-2.5">
        {step.optionsKey.map((optKey, idx) => {
          const isSel = selected.includes(idx);
          return (
            <button
              key={optKey}
              onClick={() => toggle(idx)}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-4 text-left font-mono text-sm transition-all duration-200 md:px-5 md:py-5 md:text-base ${
                isSel
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-card/40 text-foreground/85 hover:border-primary/40 hover:bg-card'
              }`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                  isSel
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40 group-hover:border-foreground/50'
                }`}
              >
                {isSel && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span className="flex-1">{t(optKey)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Select (dropdown — usando nativo pra mobile UX melhor)
  if (step.type === 'select') {
    return (
      <select
        value={value === '' ? '' : value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full rounded-xl border border-border bg-card/40 px-4 py-4 font-mono text-base text-foreground outline-none transition-all focus:border-primary/60 focus:bg-card md:text-lg"
      >
        <option value="" disabled>
          —
        </option>
        {step.optionsKey.map((optKey, idx) => (
          <option key={optKey} value={idx}>
            {t(optKey)}
          </option>
        ))}
      </select>
    );
  }

  return null;
}
