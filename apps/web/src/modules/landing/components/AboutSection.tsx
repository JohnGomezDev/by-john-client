'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { SECTION_CLASS } from '@/modules/landing/constants/landing.constants';

import { MusicPlayerCard } from './MusicPlayerCard';

export function AboutSection(): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  const baseVariant = {
    initial: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 } as const,
  };

  const leftTransition = {
    duration: shouldReduce ? 0.01 : 0.5,
    ease: 'easeOut' as const,
  };
  const rightTransition = {
    duration: shouldReduce ? 0.01 : 0.5,
    ease: 'easeOut' as const,
    delay: shouldReduce ? 0 : 0.12,
  };

  return (
    <section id="about" aria-labelledby="about-heading" className={SECTION_CLASS}>
      <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-6">
        <motion.article
          {...baseVariant}
          transition={leftTransition}
          className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:gap-5 sm:p-8"
        >
          <h2
            id="about-heading"
            className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Más allá de la pantalla
          </h2>

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Creo que escribir código es un acto de diseño. Cada función, cada
              componente y cada decisión arquitectónica moldea la experiencia
              final. Mi enfoque está arraigado en el minimalismo: eliminar lo
              innecesario para revelar la estructura esencial.
            </p>
            <p>
              Cuando no estoy arquitectando sistemas, probablemente estoy
              explorando la intersección entre el arte generativo y el diseño de
              interfaces, o curando playlists para sesiones de código de alta
              concentración.
            </p>
          </div>
        </motion.article>

        <motion.div {...baseVariant} transition={rightTransition} className="h-full">
          <MusicPlayerCard />
        </motion.div>
      </div>
    </section>
  );
}
