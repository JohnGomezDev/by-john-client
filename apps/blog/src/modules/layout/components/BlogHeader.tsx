import { BlogBrand } from './BlogBrand';
import { SocialLinks } from './SocialLinks';

export function BlogHeader(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <BlogBrand size="sm" animated />

        <nav aria-label="Redes sociales">
          <SocialLinks size="sm" />
        </nav>
      </div>
    </header>
  );
}
