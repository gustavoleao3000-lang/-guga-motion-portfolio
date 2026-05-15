import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

const BehanceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.5 11.25c1.24 0 2.25-.99 2.25-2.21C9.75 7.77 8.74 7 7.5 7H3v4.25h4.5zm.35 1.5H3V17h4.95c1.38 0 2.55-1.1 2.55-2.34 0-1.22-1.1-1.91-2.65-1.91zM15.75 9a3.75 3.75 0 0 0-3.75 3.75h7.5A3.75 3.75 0 0 0 15.75 9zm0-1.5a5.25 5.25 0 0 1 5.25 5.25v.75h-9v.15A3 3 0 0 0 15 16.5h.75a3 3 0 0 0 2.4-1.2h1.8a4.5 4.5 0 0 1-4.2 2.7 4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 15.75 9v-.75zM8.55 6H14.7V4.5H8.55V6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SOCIALS = [
  { name: 'Instagram', Icon: InstagramIcon, url: 'https://www.instagram.com/guga.motion/' },
  { name: 'Behance',   Icon: BehanceIcon,   url: 'https://www.behance.net/gugamotion' },
].filter((s) => s.url && s.url !== '#');

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 px-6 md:px-12 py-8 md:py-10 mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-6 md:mb-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight mb-3">
              GUGA MOTION<span className="text-primary">.</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-xs mb-6">
              {t('footer_desc')}
            </p>
            {/* Social icons (só aparece se tiver URL real configurada) */}
            {SOCIALS.length > 0 && (
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ name, Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={name}
                    className="w-9 h-9 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60 mb-4">{t('navigation')}</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="font-mono text-sm text-foreground/70 hover:text-primary transition-colors">Home</Link>
              <Link to="/trabalhos" className="font-mono text-sm text-foreground/70 hover:text-primary transition-colors">Trabalho</Link>
              <Link to="/about" className="font-mono text-sm text-foreground/70 hover:text-primary transition-colors">Sobre</Link>
              <Link to="/contact" className="font-mono text-sm text-foreground/70 hover:text-primary transition-colors">Contato</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60 mb-4">Contato</h4>
            <a
              href="https://wa.me/5562998744360?text=Oi%2C%20Guga!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-mono text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Gustavo Leão — {t('rights')}
          </p>
          <p className="font-mono text-xs text-muted-foreground/50">
            {t('design_dev')}
          </p>
        </div>
      </div>
    </footer>
  );
}
