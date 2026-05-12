import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Film, Smartphone, Star, Play, Layers } from 'lucide-react';

const SERVICES = [
  {
    icon: Play,
    title: 'Motion Design para Marcas',
    desc: 'Animações e vídeos que comunicam a identidade da sua marca com impacto visual.'
  },
  {
    icon: Smartphone,
    title: 'Conteúdo para Redes Sociais',
    desc: 'Reels, stories e criativos animados que geram mais engajamento e alcance.'
  },
  {
    icon: Film,
    title: 'Vídeos Promocionais',
    desc: 'Vídeos de vendas, lançamentos e campanhas que convencem e convertem.'
  },
  {
    icon: Layers,
    title: 'Identidade Visual Animada',
    desc: 'Logo animada, intro de vídeo e branding em movimento com personalidade.'
  },
  {
    icon: Star,
    title: 'Criativos para Campanhas',
    desc: 'Peças digitais animadas para tráfego pago, email marketing e landing pages.'
  },
  {
    icon: Zap,
    title: 'Vinhetas e Peças Digitais',
    desc: 'Vinhetas, bumpers, transições e assets visuais para produtoras e criadores.'
  }
];

export default function ServicesSection() {
  return (
    <section className="px-5 md:px-12 py-8 md:py-12 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-7 md:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary">O que eu faço</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Serviços para marcas<br className="hidden md:block" />
            <span className="text-primary"> que querem se destacar.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-0">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
