import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const NAV_LINKS = [
  { label: 'Trabalho', path: '/trabalhos' },
  { label: 'Sobre', path: '/about' },
  { label: 'Contato', path: '/contact' }
];

// SVG icons for socials
const BehanceIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.5 11.25c1.24 0 2.25-.99 2.25-2.21C9.75 7.77 8.74 7 7.5 7H3v4.25h4.5zm.35 1.5H3V17h4.95c1.38 0 2.55-1.1 2.55-2.34 0-1.22-1.1-1.91-2.65-1.91zM15.75 9a3.75 3.75 0 0 0-3.75 3.75h7.5A3.75 3.75 0 0 0 15.75 9zm0-1.5a5.25 5.25 0 0 1 5.25 5.25v.75h-9v.15A3 3 0 0 0 15 16.5h.75a3 3 0 0 0 2.4-1.2h1.8a4.5 4.5 0 0 1-4.2 2.7 4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 15.75 9v-.75zM8.55 6H14.7V4.5H8.55V6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Pra adicionar seus links de social: troque os '' por URLs reais.
// Links vazios ficam OCULTOS automaticamente (não viram <a href="#"> morto).
// Ex: { name: 'Instagram', Icon: InstagramIcon, url: 'https://instagram.com/seu_user' }
const SOCIALS = [
  { name: 'Behance', Icon: BehanceIcon, url: '' },
  { name: 'Instagram', Icon: InstagramIcon, url: '' },
  { name: 'LinkedIn', Icon: LinkedInIcon, url: '' },
].filter((s) => s.url && s.url !== '#');

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLanguage();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <nav className="bg-background/80 backdrop-blur-xl px-5 py-4 fixed top-0 left-0 right-0 z-50 md:px-12 md:py-5 border-b border-border/30">
        <div className="flex items-center justify-between">
          {/* Left: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-mono uppercase tracking-widest transition-all duration-200 hover:text-primary ${
                  isActive(link.path) ? 'text-primary font-bold' : 'text-foreground/70 font-normal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile: hamburger left */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-foreground/60 hover:text-primary transition-colors p-2 z-10">
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 font-display font-black text-sm md:text-base tracking-tight text-foreground whitespace-nowrap overflow-hidden hover:text-primary transition-colors duration-300">
            {'GUGA MOTION'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <motion.span
              className="text-primary"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 'GUGA MOTION'.length * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}>
              .
            </motion.span>
          </Link>

          {/* Right: WhatsApp + Socials (se houver) + Language (desktop) */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
            <a
              href="https://wa.me/5562998744360?text=Oi%2C%20Guga!%20Vi%20seu%20portf%C3%B3lio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#25D366] transition-all duration-200 hover:border-[#25D366] hover:bg-[#25D366]/20"
            >
              WhatsApp →
            </a>
            {SOCIALS.map(({ name, Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                className="text-muted-foreground hover:text-primary transition-colors">
                <Icon />
              </a>
            ))}
            <div className="w-px h-3 bg-border mx-1" />
            <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
              <button
                onClick={() => setLang('pt')}
                className={`transition-colors ${lang === 'pt' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                PT
              </button>
              <span className="text-border/60">|</span>
              <button
                onClick={() => setLang('en')}
                className={`transition-colors ${lang === 'en' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
                EN
              </button>
            </div>
          </div>

          {/* Mobile: empty right placeholder for balance */}
          <div className="md:hidden w-7" />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[60%] bg-card border-l border-border z-50 flex flex-col">
              <div className="flex justify-end p-6">
                <button onClick={() => setMenuOpen(false)} className="text-foreground hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-12 gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                    <Link
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-display font-black text-5xl tracking-tight leading-tight transition-colors duration-300 ${
                        isActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                      }`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-12 pb-12 border-t border-border pt-6 flex flex-col gap-4">
                <a
                  href="https://wa.me/5562998744360?text=Oi%2C%20Guga!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-[#25D366]"
                >
                  WhatsApp →
                </a>
                {SOCIALS.length > 0 && (
                  <div className="flex gap-6">
                    {SOCIALS.map(({ name, Icon, url }) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={name}
                        className="text-muted-foreground hover:text-primary transition-colors">
                        <Icon />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
