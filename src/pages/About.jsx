import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Eye, Layers, Globe } from 'lucide-react';

const DISCIPLINES = [
  { icon: Zap, title: 'Motion Design', desc: 'Animações 2D/3D, vinhetas, intros e conteúdo em movimento que dá personalidade à marca.' },
  { icon: Eye, title: 'Criativos para Redes', desc: 'Reels, stories e peças animadas feitas para performar no feed e gerar engajamento real.' },
  { icon: Layers, title: 'Identidade Animada', desc: 'Logo animada, branding em movimento e assets visuais com consistência e estilo.' },
  { icon: Globe, title: 'Vídeos Promocionais', desc: 'Vídeos de vendas, lançamentos e campanhas que convencem e convertem clientes.' },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-10 md:pb-14 px-5 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-primary" />
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Sobre mim</p>
          </div>
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none max-w-3xl">
            Eu transformo ideias em
            <span className="text-primary"> animações que vendem.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-14"
        >
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-card">
              <img
                src="https://media.base44.com/images/public/69c67984fa1d361ff818abe5/fbbd09a48_Imagem1gerada.png"
                alt="Gustavo Leão"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center 20%' }}
              />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50">
                <p className="font-display font-bold text-sm text-foreground">Gustavo Leão</p>
                <p className="font-mono text-xs text-primary mt-0.5">Motion Designer & Animador</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6 flex flex-col justify-center gap-5">
            <p className="font-mono text-sm md:text-base text-foreground/90 leading-relaxed">
              Sou <strong className="text-foreground">Gustavo Leão</strong>, motion designer com mais de 3 anos criando animações, vídeos e criativos visuais para marcas, negócios e criadores de conteúdo.
            </p>
            <div className="w-full h-px bg-border/40" />
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              Trabalho com <strong className="text-foreground">marcas que precisam se destacar</strong> — seja no feed, em campanhas pagas, lançamentos ou na identidade visual animada. Entrego projetos com qualidade premium, prazo respeitado e comunicação direta.
            </p>
            <div className="w-full h-px bg-border/40" />
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              Se você quer uma animação que realmente comunique, convença e venda, eu sou a pessoa certa para o seu projeto.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Li%20sobre%20voc%C3%AA%20e%20quero%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fb558] text-white font-display font-bold text-sm tracking-tight px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon />
                Falar comigo no WhatsApp
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-primary/30 bg-primary/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">Disponível agora</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-t border-border/40 pt-8 md:pt-10"
        >
          <div className="flex items-center gap-3 mb-10">
            <span className="block w-6 h-px bg-primary" />
            <h2 className="font-display font-bold text-lg tracking-tight">O que posso fazer por você</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {DISCIPLINES.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-sm tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">{skill.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">
            Pronto para começar?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-display font-black text-3xl md:text-4xl tracking-tight text-foreground hover:text-primary transition-colors duration-300 group"
          >
            Fale comigo agora
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
