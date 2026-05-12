import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Send, Clock } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    icon: Sparkles,
    title: 'Briefing',
    time: '24h',
    desc: 'Você manda o brief no WhatsApp. Em até 24h respondo com proposta clara — escopo, prazo e investimento.',
  },
  {
    n: '02',
    icon: Wand2,
    title: 'Criação',
    time: '3-5 dias',
    desc: 'Primeira versão entregue em até 5 dias. Você revisa, eu ajusto. Até 2 rodadas de revisão inclusas no Pro.',
  },
  {
    n: '03',
    icon: Send,
    title: 'Entrega',
    time: 'Mesmo dia',
    desc: 'Arquivo final em todos os formatos pedidos (16:9, 9:16, 1:1) prontos pra postar — sem retrabalho.',
  },
];

export default function ProcessSection() {
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
              Como funciona
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Do brief ao reel<br className="hidden md:block" />
            <span className="text-primary"> em 3 passos.</span>
          </h2>
          <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
            Sem mistério, sem enrolação. Você sabe exatamente o que esperar.
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha conectora — desktop apenas */}
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
                  {/* Cabeçalho: ícone + número grande */}
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-display text-2xl font-black text-primary/30">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                    {s.title}
                  </h3>

                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      {s.time}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
                    {s.desc}
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
