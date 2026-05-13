import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Play } from 'lucide-react';

const WHATSAPP = '5562998744360';

const PACKAGES = [
  {
    id: 'start',
    name: 'Start',
    eyebrow: 'Pra começar com motion',
    priceFrom: 'R$ 450',
    priceTo: 'R$ 800',
    priceFootnote: null,
    features: [
      '1 reel até 15s',
      '1 rodada de revisão',
      'Cortes, ritmo e legendas',
      'Acabamento visual profissional',
      'Entrega rápida (até 5 dias)',
    ],
    note: 'Ideal pra negócios que querem testar conteúdo profissional',
    cta: 'Quero o Start',
    whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20Pack%20Start.%20Pode%20me%20mandar%20detalhes%3F',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    eyebrow: 'Mais escolhido',
    priceFrom: 'R$ 1.500',
    priceTo: 'R$ 2.800',
    priceFootnote: null,
    features: [
      '3 a 5 reels curtos',
      'Motion design leve/moderado',
      'Identidade visual aplicada',
      'Até 2 rodadas de revisão',
      'Trilha sonora licenciada',
      'Entrega em 7-10 dias',
    ],
    note: 'Pra marcas que querem consistência e aparência profissional',
    cta: 'Quero o Pro',
    whatsappMsg: 'Oi%20Guga%2C%20quero%20o%20Pack%20Pro.%20Pode%20me%20mandar%20detalhes%3F',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    eyebrow: 'Projetos grandes',
    priceFrom: 'Sob consulta',
    priceTo: null,
    priceFootnote: 'a partir de R$ 3.500',
    features: [
      'Pacote completo de vídeos',
      'Direção visual',
      'Motion design avançado',
      'Campanha, lançamento ou recorrente',
      'Prazo e escopo customizados',
    ],
    note: 'Pra empresas que querem presença forte nas redes',
    cta: 'Pedir orçamento',
    whatsappMsg: 'Oi%20Guga%2C%20tenho%20um%20projeto%20Premium%20pra%20conversar.',
    featured: false,
  },
];

function PriceDisplay({ pkg }) {
  if (pkg.priceTo) {
    return (
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          A partir de
        </p>
        <p className="mt-1 font-display text-3xl font-black tracking-tight text-foreground md:text-4xl">
          {pkg.priceFrom}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          até <span className="text-foreground/85">{pkg.priceTo}</span>
        </p>
      </div>
    );
  }
  // Premium
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        Investimento
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

function PackageCard({ pkg, index }) {
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
      {/* Badge "Mais escolhido" */}
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-background px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            <Sparkles className="h-3 w-3 fill-primary" />
            Mais escolhido
          </span>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="mb-5">
        <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
          {/* Detalhe ciano sutil */}
          <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground" />
          <span className={isFeatured ? 'text-primary' : 'text-muted-foreground/80'}>
            {pkg.eyebrow}
          </span>
        </p>
        <h3 className="mt-2 font-display text-2xl font-black tracking-tight md:text-3xl">
          Pack <span className={isFeatured ? 'text-primary' : 'text-foreground'}>{pkg.name}</span>
        </h3>
      </div>

      {/* Preço */}
      <div className="mb-6 border-b border-border pb-6">
        <PriceDisplay pkg={pkg} />
      </div>

      {/* Features */}
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

      {/* Nota */}
      <p className="mb-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {pkg.note}
      </p>

      {/* CTA */}
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
  return (
    <section id="pacotes" className="border-t border-border/40 px-5 py-10 md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
              Packs
            </span>
            {/* Marcador ciano discreto */}
            <span className="block h-px flex-1 max-w-[60px] bg-muted-foreground/30" />
          </div>
          <h2 className="font-display text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Packs pra colocar sua marca<br className="hidden md:block" />
            <span className="text-primary"> em movimento.</span>
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            Vídeos curtos, diretos e com visual profissional pra destacar seu negócio nas redes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* CTAs principais embaixo */}
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
            Pedir orçamento
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#showreel"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground/50 hover:bg-card sm:w-auto"
          >
            <Play className="h-3 w-3 fill-current" />
            Ver trabalhos
          </a>
        </motion.div>

        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground/60">
          Pagamento em PIX, transferência ou Stripe · Nota fiscal disponível
        </p>
      </div>
    </section>
  );
}
