import { useState } from 'react';
import { Download, Mail, Upload, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import type { PersonalInfo } from '@shared/schema';

interface HeroProps {
  personalInfo: PersonalInfo;
  onPhotoUpdate: (photo: string) => void;
}

export function Hero({ personalInfo, onPhotoUpdate }: HeroProps) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      if (data.success && data.photoUrl) {
        onPhotoUpdate(data.photoUrl);
        toast({
          title: 'Success',
          description: 'Profile photo updated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoUrl = () => {
    if (photoUrl.trim()) {
      onPhotoUpdate(photoUrl);
      setPhotoUrl('');
      toast({
        title: 'Success',
        description: 'Profile photo updated successfully',
      });
    }
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
      data-testid="section-hero"
    >
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <Avatar className="h-48 w-48 border-4 border-primary/20" data-testid="avatar-profile">
                <AvatarImage src={personalInfo.photo} alt={personalInfo.name} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-accent text-primary-foreground" data-testid="avatar-fallback">
                  {personalInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Photo Upload UI */}
              <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Card className="p-2" data-testid="card-photo-upload">
                  <div className="flex gap-2">
                    <label htmlFor="photo-upload">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="cursor-pointer" 
                        disabled={isUploading}
                        asChild
                      >
                        <span data-testid="button-upload-photo">
                          <Upload className="h-4 w-4" />
                        </span>
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={isUploading}
                        data-testid="input-upload-photo"
                      />
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" data-testid="button-photo-url">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <div className="p-3 space-y-2">
                          <Input
                            placeholder="Enter image URL..."
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            data-testid="input-photo-url"
                          />
                          <Button
                            size="sm"
                            onClick={handlePhotoUrl}
                            className="w-full"
                            data-testid="button-save-photo-url"
                          >
                            Set Photo
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4"
            data-testid="heading-hero-name"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-8"
            data-testid="text-hero-title"
          >
            {personalInfo.title}
          </motion.p>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-foreground/80 mb-12 leading-relaxed"
            data-testid="text-hero-summary"
          >
            {personalInfo.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-testid="container-hero-ctas"
          >
            <Button
              size="lg"
              className="gap-2 min-w-[180px]"
              asChild
              data-testid="button-view-resume"
            >
              <a
                href="/resume/Kishore-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-view-resume"
              >
                <Download className="h-5 w-5" />
                View Resume
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 min-w-[180px]"
              onClick={scrollToContact}
              data-testid="button-contact"
            >
              <Mail className="h-5 w-5" />
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        data-testid="scroll-indicator"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-muted-foreground rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
