import { Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <footer className="bg-card border-t border-card-border py-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kishore Kumar S S
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              All rights reserved
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resume Downloads */}
          <div className="text-center md:text-right space-y-3">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Download Resume
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end">
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                asChild
                data-testid="link-footer-sde-resume"
              >
                <a href="/api/resume/sde" download="Kishore_Kumar_SDE_Resume.pdf">
                  <Download className="h-3 w-3" />
                  SDE
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                asChild
                data-testid="link-footer-ai-resume"
              >
                <a href="/api/resume/ai" download="Kishore_Kumar_AI_Resume.pdf">
                  <Download className="h-3 w-3" />
                  AI
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={handlePrint}
                data-testid="button-print-resume"
              >
                <Download className="h-3 w-3" />
                Print
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
