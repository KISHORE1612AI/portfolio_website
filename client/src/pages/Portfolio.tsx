import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Research } from '@/components/Research';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import type { PortfolioContent } from '@shared/schema';

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
        <About
          personalInfo={content.personalInfo}
          education={content.education}
        />
        <Skills skills={content.skills} />
        <Experience experience={content.experience} />
        <Projects projects={content.projects} />
        <Research research={content.research} />
        <Certifications
          certifications={content.certifications}
          awards={content.awards}
        />
        <Contact personalInfo={content.personalInfo} />
      </main>
      <Footer />
    </div>
  );
}
