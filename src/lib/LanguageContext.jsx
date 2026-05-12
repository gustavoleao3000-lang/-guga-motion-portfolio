import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  pt: {
    // Footer
    footer_desc: 'Motion design que vende. Animações e vídeos para marcas que querem se destacar.',
    navigation: 'Navegação',
    rights: 'Todos os direitos reservados',
    design_dev: 'Design & Desenvolvimento',
  },
  en: {
    // Footer
    footer_desc: 'Motion design that sells. Animations and videos for brands that want to stand out.',
    navigation: 'Navigation',
    rights: 'All rights reserved',
    design_dev: 'Design & Development',
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt');
  const t = (key) => translations[lang][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
