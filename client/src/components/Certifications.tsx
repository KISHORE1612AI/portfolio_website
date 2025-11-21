import { Award, Trophy, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { Certification, Award as AwardType } from '@shared/schema';

interface CertificationsProps {
  certifications: Certification[];
  awards: AwardType[];
}

export function Certifications({ certifications, awards }: CertificationsProps) {
  return (
    <section id="certifications" className="py-20 sm:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-certifications">
            Certifications & Awards
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />

          {/* Certifications Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-foreground/90" data-testid="heading-certifications-section">
              Professional Certifications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`card-cert-${cert.id}`}
                >
                  <Card className="p-6 h-full hover-elevate">
                    <div className="flex flex-col h-full">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" data-testid={`icon-cert-${cert.id}`}>
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 flex-1" data-testid={`text-cert-name-${cert.id}`}>
                        {cert.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3" data-testid={`text-cert-issuer-${cert.id}`}>
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`text-cert-date-${cert.id}`}>
                        <Calendar className="h-4 w-4" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center text-foreground/90" data-testid="heading-awards-section">
              Awards & Recognition
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  data-testid={`card-award-${index}`}
                >
                  <Card className="p-6 h-full hover-elevate">
                    <div className="flex flex-col h-full">
                      <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4" data-testid={`icon-award-${index}`}>
                        <Trophy className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2" data-testid={`text-award-title-${index}`}>
                        {award.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-award-org-${index}`}>
                        {award.organization}
                      </p>
                      <p className="text-sm text-foreground/80 mb-3 flex-1" data-testid={`text-award-description-${index}`}>
                        {award.description}
                      </p>
                      <Badge variant="secondary" className="self-start rounded-full text-xs" data-testid={`badge-award-date-${index}`}>
                        {award.date}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
