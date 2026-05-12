import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const canSubmit = form.name.trim() && form.message.trim();

  const handleWhatsApp = () => {
    if (!canSubmit) return;
    const text = encodeURIComponent(
      `Oi, Guga! Me chamo ${form.name}.\n\n${form.message}`
    );
    window.open(`https://wa.me/5562998744360?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-5 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20">
      <div className="max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-6 h-px bg-primary" />
                <p className="font-mono text-xs uppercase tracking-widest text-primary">Contato</p>
              </div>

              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4">
                Vamos criar algo{' '}
                <span className="text-primary">incrível juntos?</span>
              </h1>

              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10">
                Me conte sua ideia e eu te respondo com o melhor caminho para tirar ela do papel.
              </p>

              <a
                href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Quero%20conversar%20sobre%20um%20projeto%20de%20motion%20design."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366] hover:bg-[#1fb558] text-white font-display font-bold text-base tracking-tight px-6 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/20 mb-8"
              >
                <WhatsAppIcon />
                <div>
                  <p className="text-base font-bold leading-tight">Falar sobre meu projeto no WhatsApp</p>
                  <p className="font-mono text-xs font-normal opacity-80 mt-0.5">Resposta rápida · Orçamento sem compromisso</p>
                </div>
              </a>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-border/50" />
                <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-widest">ou deixe uma mensagem</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    placeholder="Como posso te chamar?"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className="w-full bg-card border border-border/60 focus:border-primary rounded-xl px-4 py-3.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Sobre o projeto
                  </label>
                  <textarea
                    placeholder="Me conte: o que você precisa? É para redes sociais, lançamento, identidade animada? Quanto mais detalhes, melhor."
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={5}
                    className="w-full bg-card border border-border/60 focus:border-primary rounded-xl px-4 py-3.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleWhatsApp}
                  disabled={!canSubmit}
                  className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-display font-bold text-sm tracking-tight px-6 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar mensagem pelo WhatsApp
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </motion.div>
              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight mb-4">Boa!</h2>
              <p className="font-mono text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Sua mensagem foi aberta no WhatsApp. Bora conversar e tirar essa ideia do papel!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
