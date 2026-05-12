import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import PortfolioLayout from './components/layout/PortfolioLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
