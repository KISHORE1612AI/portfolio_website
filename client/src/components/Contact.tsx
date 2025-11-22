import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import type { PersonalInfo } from '@shared/schema';

interface ContactProps {
  personalInfo: PersonalInfo;
}

export function Contact({ personalInfo }: ContactProps) {
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`;

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: gmailComposeLink,
      external: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      external: false,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: personalInfo.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'View GitHub Profile',
      href: personalInfo.github,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-contact">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            Ready to collaborate? Reach out directly via Gmail or through any of the links below.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 space-y-4" data-testid="card-contact-email-cta">
                <h3 className="text-2xl font-semibold text-foreground">Write me on Gmail</h3>
                <p className="text-muted-foreground">
                  Click below to open Gmail with my address pre-filled. Drop a line with your ideas, collaborations,
                  or opportunities and I&apos;ll respond as soon as possible.
                </p>
                <Button
                  className="gap-2"
                  asChild
                  data-testid="button-open-gmail"
                >
                  <a href={gmailComposeLink} target="_blank" rel="noopener noreferrer">
                    <Mail className="h-4 w-4" />
                    Email Kishore
                  </a>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {contactLinks.map((link) => (
                <Card
                  key={link.label}
                  className="p-6 hover-elevate"
                  data-testid={`card-contact-${link.label.toLowerCase()}`}
                >
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                    data-testid={`link-contact-${link.label.toLowerCase()}`}
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <link.icon className="h-6 w-6 text-primary" data-testid={`icon-contact-${link.label.toLowerCase()}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1" data-testid={`text-contact-${link.label.toLowerCase()}-label`}>
                        {link.label}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors" data-testid={`text-contact-${link.label.toLowerCase()}-value`}>
                        {link.value}
                      </p>
                    </div>
                  </a>
                </Card>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
