import { AboutSection } from '@/modules/landing/components/AboutSection';
import { BlogPreviewSection } from '@/modules/landing/components/BlogPreviewSection';
import { HeroSection } from '@/modules/landing/components/HeroSection';
import { ToolsSection } from '@/modules/landing/components/ToolsSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'John Gomez',
  url: siteUrl,
  jobTitle: 'Desarrollador de software',
  description:
    'Desarrollador de software especializado en arquitecturas elegantes y de alto rendimiento.',
  sameAs: [
    'https://github.com/johngomez',
    'https://linkedin.com/in/johngomez',
  ],
};

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <HeroSection />
      <ToolsSection />
      <AboutSection />
      <BlogPreviewSection />
    </>
  );
}
