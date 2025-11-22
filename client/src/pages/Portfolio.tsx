import { useState, useEffect, lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import type { PortfolioContent } from '@shared/schema';

const AboutSection = lazy(() =>
  import('@/components/About').then((module) => ({ default: module.About })),
);
const SkillsSection = lazy(() =>
  import('@/components/Skills').then((module) => ({ default: module.Skills })),
);
const ExperienceSection = lazy(() =>
  import('@/components/Experience').then((module) => ({ default: module.Experience })),
);
const ProjectsSection = lazy(() =>
  import('@/components/Projects').then((module) => ({ default: module.Projects })),
);
const CertificationsSection = lazy(() =>
  import('@/components/Certifications').then((module) => ({ default: module.Certifications })),
);
const ContactSection = lazy(() =>
  import('@/components/Contact').then((module) => ({ default: module.Contact })),
);

function SectionFallback({ title }: { title: string }) {
  return (
    <section className="py-20" aria-label={`${title} loading`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-32 rounded-2xl border border-dashed border-border/60 animate-pulse bg-muted/40" />
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content.json')
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load content:', error);
        setLoading(false);
      });
  }, []);

  const handlePhotoUpdate = async (photo: string) => {
    if (!content) return;

    const updatedContent = {
      ...content,
      personalInfo: {
        ...content.personalInfo,
        photo,
      },
    };

    // Update local state immediately for responsive UI
    setContent(updatedContent);

    // Persist to backend
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContent),
      });

      if (!response.ok) {
        throw new Error('Failed to persist photo update');
      }
    } catch (error) {
      console.error('Failed to update photo:', error);
      // Revert to original content on error
      setContent(content);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive">Failed to load portfolio content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero
          personalInfo={content.personalInfo}
          onPhotoUpdate={handlePhotoUpdate}
        />
        <Suspense fallback={<SectionFallback title="About" />}>
          <AboutSection
            personalInfo={content.personalInfo}
            education={content.education}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback title="Skills" />}>
          <SkillsSection skills={content.skills} />
        </Suspense>

        <Suspense fallback={<SectionFallback title="Experience" />}>
          <ExperienceSection experience={content.experience} />
        </Suspense>

        <Suspense fallback={<SectionFallback title="Projects" />}>
          <ProjectsSection projects={content.projects} />
        </Suspense>

        <Suspense fallback={<SectionFallback title="Certifications & Awards" />}>
          <CertificationsSection
            certifications={content.certifications}
            awards={content.awards}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback title="Contact" />}>
          <ContactSection personalInfo={content.personalInfo} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
