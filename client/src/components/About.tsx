import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { PersonalInfo, Education } from '@shared/schema';

interface AboutProps {
  personalInfo: PersonalInfo;
  education: Education[];
}

export function About({ personalInfo, education }: AboutProps) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-about">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />

          {/* Summary Card */}
          <Card className="max-w-4xl mx-auto p-8 mb-8" data-testid="card-about-summary">
            <p className="text-lg text-foreground/90 leading-relaxed text-center mb-8" data-testid="text-about-summary">
              {personalInfo.summary}
            </p>

            {/* Highlight Chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {personalInfo.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-accent/10 text-accent-foreground border border-accent/30 rounded-full"
                    data-testid={`badge-highlight-${index}`}
                  >
                    {highlight}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Education */}
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="max-w-4xl mx-auto p-6" data-testid={`card-education-${index}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground" data-testid={`text-education-degree-${index}`}>
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-education-institution-${index}`}>
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <p className="text-sm text-muted-foreground" data-testid={`text-education-graduation-${index}`}>
                      Graduated: {edu.graduationDate}
                    </p>
                    <p className="text-sm font-medium text-foreground" data-testid={`text-education-cgpa-${index}`}>
                      CGPA: {edu.cgpa}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
