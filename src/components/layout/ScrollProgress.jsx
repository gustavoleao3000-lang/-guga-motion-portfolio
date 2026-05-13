import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Barra fina magenta no topo que cresce conforme o scroll
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-primary shadow-[0_0_8px_rgba(255,0,255,0.6)]"
      style={{ scaleX }}
    />
  );
}
