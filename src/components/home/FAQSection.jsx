import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    q: 'Quanto tempo demora pra entregar?',
    a: 'Pacote Essencial: 3-5 dias úteis. Pacote Pro: 7-10 dias. Brand films e projetos sob medida: 2-3 semanas, dependendo do escopo. Combinamos prazo certo no briefing.',
  },
  {
    q: 'Quantas revisões estão inclusas?',
    a: 'Essencial: 1 rodada de revisão. Pro: até 2 rodadas. Revisões extras são cobradas à parte (combinadas antes de começar). 90% dos projetos fecham dentro das revisões inclusas.',
  },
  {
    q: 'Atende fora de Goiânia?',
    a: 'Sim — 100% remoto. Tudo via WhatsApp, e-mail e chamada quando precisar. Já entreguei projetos pra clientes em SP, RJ, BH, Floripa e Lisboa.',
  },
  {
    q: 'Em quais formatos é entregue?',
    a: 'MP4 (H.264) nos formatos que você pedir — 16:9 (YouTube/site), 9:16 (Reels/TikTok/Stories), 1:1 (feed Instagram). O projeto fonte (.aep do After Effects) vem incluso no Pacote Pro.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: '50% na aprovação do briefing + 50% na entrega final. Aceito PIX, transferência ou Stripe (pra clientes do exterior). Nota fiscal disponível mediante solicitação.',
  },
];

function FAQItem({ item, isOpen, onToggle, index }) {
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
          {item.q}
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
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openSet, setOpenSet] = useState(() => new Set());

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
              FAQ
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Perguntas que<br className="hidden md:block" />
            <span className="text-primary"> todo mundo faz.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          Ficou alguma dúvida?{' '}
          <a
            href="https://wa.me/5562998744360?text=Oi%20Guga%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20teu%20trabalho."
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Manda no WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
