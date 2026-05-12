import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';

export default function PortfolioLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-display">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
