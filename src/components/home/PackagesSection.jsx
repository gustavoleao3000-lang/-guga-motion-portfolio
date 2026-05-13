import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

// TODO: Guga — preencher os valores reais nos campos `price` dos pacotes Essencial e Pro
const PACKAGES = [
  {
    name: 'Essencial',
    eyebrow: 'Pra começar com motion',
    price: 'R$ XXX', // TODO: definir preço
    priceLabel: 'a partir de',
    features: [
      '1 reel animado (até 15s)',
      '1 rodada de revisão',
      'Formatos 9:16 + 1:1',
      'Entrega em até 5 dias',
      'Trilha sonora licenciada',
    ],
    cta: 'Quero o Essencial',
    whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20pacote%20Essencial.%20Pode%20me%20mandar%20o%20que%20preciso%3F',
    featured: false,
  },
  {
    name: 'Pro',
    eyebrow: 'Mais escolhido',
    price: 'R$ XXX', // TODO: definir preço
    priceLabel: 'a partir de',
    features: [
      '3 reels animados (até 30s cada)',
      'Até 2 rodadas de revisão',
      'Formatos 16:9 + 9:16 + 1:1',
      'Vinheta de marca animada',
      'Entrega em 7-10 dias',
      'Projeto fonte (.aep) incluso',
    ],
    cta: 'Quero o Pro',
    whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20pacote%20Pro.%20Pode%20me%20mandar%20mais%20detalhes%3F',
    featured: true,
  },
  {
    name: 'Sob medida',
    eyebrow: 'Pra projetos grandes',
    price: 'Vamos conversar',
    priceLabel: null,
    features: [
      'Brand films & campanhas',
      'Séries de conteúdo recorrente',
      'Parcerias mensais',
      'Direção criativa completa',
      'Prazo e escopo customizados',
    ],
    cta: 'Pedir orçamento',
    whatsappMsg: 'Oi%20Guga%2C%20tenho%20um%20projeto%20sob%20medida%20pra%20conversar.',
    featured: false,
  },
];

function PackageCard({ pkg, index }) {
  const isFeatured = pkg.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 ${
        isFeatured
          ? 'border border-primary/60 bg-gradient-to-br from-primary/[0.08] via-card to-card shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] md:-mt-4 md:pb-10'
          : 'border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card'
      }`}
    >
      {/* Badge "Mais escolhido" */}
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-background px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Sparkles className="h-3 w-3 fill-primary" />
            Mais escolhido
          </span>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
          {pkg.eyebrow}
        </p>
        <h3 className="mt-1 font-display text-2xl font-black tracking-tight md:text-3xl">
          {pkg.name}
        </h3>
      </div>

      {/* Preço */}
      <div className="mb-6 border-b border-border/40 pb-6">
        {pkg.priceLabel && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            {pkg.priceLabel}
          </p>
        )}
        <p
          className={`mt-1 font-display font-black tracking-tight ${
            pkg.priceLabel
              ? 'text-3xl md:text-4xl text-foreground'
              : 'text-2xl md:text-3xl text-foreground/80'
          }`}
        >
          {pkg.price}
        </p>
      </div>

      {/* Features */}
      <ul className="mb-7 flex flex-1 flex-col gap-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                isFeatured ? 'bg-primary/20' : 'bg-primary/10'
              }`}
            >
              <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
            </span>
            <span className="font-mono text-xs leading-relaxed text-foreground/85">
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={`https://wa.me/5562998744360?text=${pkg.whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group/cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
          isFeatured
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(6,182,212,0.5)]'
            : 'border border-primary/40 bg-primary/5 text-primary hover:border-primary hover:bg-primary/15'
        }`}
      >
        {pkg.cta}
        <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-0.5">
          →
        </span>
      </a>
    </motion.div>
  );
}

export default function PackagesSection() {
  return (
    <section id="pacotes" className="border-t border-border/30 px-5 py-10 md:px-12 md:py-14">
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
              Pacotes
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Escolhe o tamanho<br className="hidden md:block" />
            <span className="text-primary"> da sua jogada.</span>
          </h2>
          <p className="mt-3 max-w-md font-mono text-xs text-muted-foreground md:text-sm">
            Preço transparente, escopo claro, sem surpresa no meio do caminho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground/60">
          Todos os pacotes incluem trilha sonora licenciada · Pagamento em PIX, transferência ou Stripe (exterior)
        </p>
      </div>
    </section>
  );
}
