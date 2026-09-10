import {
  FOOTER_CATEGORIES,
  FOOTER_LEGAL_LINKS,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
} from '../constants/layout.constants';
import { BlogBrand } from './BlogBrand';
import { SocialLinks } from './SocialLinks';

export function BlogFooter(): React.JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:gap-16">
          <div className="flex flex-col gap-5">
            <BlogBrand />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {SITE_DESCRIPTION}
            </p>
            <nav aria-label="Redes sociales">
              <SocialLinks />
            </nav>
          </div>

          <nav aria-labelledby="footer-categories-heading">
            <h2
              id="footer-categories-heading"
              className="text-xs font-bold tracking-[0.12em] text-primary uppercase"
            >
              Categorías
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
              {FOOTER_CATEGORIES.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary sm:text-base"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {currentYear} {SITE_FULL_NAME}. Todos los derechos reservados.
          </p>

          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
