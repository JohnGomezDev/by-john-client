'use client';

import { GitHubIcon } from '@repo/modules/layout/components/SocialIcons';
import { motion } from 'framer-motion';

import { useFadeUp } from '@/lib/hooks/use-animations';
import {
  GITHUB_HREF,
  SECTION_CLASS,
} from '@/modules/landing/constants/landing.constants';

export function HeroSection(): React.JSX.Element {
  const line1 = useFadeUp(0.1);
  const line2 = useFadeUp(0.2);
  const line3 = useFadeUp(0.35);
  const line4 = useFadeUp(0.5);
  const placeholder = useFadeUp(0.3);

  return (
    <section id="hero" aria-labelledby="hero-heading" className={SECTION_CLASS}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6 sm:gap-7">
          <motion.div {...line1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent sm:text-sm">
              <span
                className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                aria-hidden="true"
              />
              Disponible para nuevas oportunidades
            </p>
          </motion.div>

          <motion.div {...line2}>
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              El código como{' '}
              <em className="not-italic text-accent">Arte.</em>
            </h1>
          </motion.div>

          <motion.p
            {...line3}
            className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Creando arquitecturas de software elegantes y de alto rendimiento.
            Cerrando la brecha entre la ingeniería compleja y la experiencia
            humana fluida.
          </motion.p>

          <motion.div
            {...line4}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver Proyectos
            </a>
            <a
              href={GITHUB_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Right column — content placeholder */}
        <motion.div {...placeholder} className="relative" aria-hidden="true">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-[5/4]">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #86efac 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-sky-500/5" />

            <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
                {'// placeholder'}
              </span>
              <p className="text-sm text-muted-foreground">
                Contenido próximamente
              </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-background/85 px-3.5 py-2.5 backdrop-blur-sm sm:right-auto sm:max-w-[260px]">
              <p className="font-mono text-[11px] text-accent">{'// estado'}</p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Arquitectura del sistema en progreso…
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
