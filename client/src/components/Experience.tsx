import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import type { Experience as ExperienceType } from '@shared/schema';

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-experience">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden sm:block" data-testid="timeline-line" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                  data-testid={`card-experience-${exp.id}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 -translate-x-1/2 hidden sm:block" data-testid={`dot-timeline-${exp.id}`}>
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  </div>

                  {/* Content */}
                  <div className="sm:ml-20">
                    <Card className="p-6 backdrop-blur-sm bg-card/50 border-card-border hover-elevate">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Company Logo Placeholder */}
                        <Avatar className="h-12 w-12 flex-shrink-0" data-testid={`avatar-company-${exp.id}`}>
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {exp.company.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-4">
                          {/* Header */}
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-1" data-testid={`text-experience-role-${exp.id}`}>
                              {exp.role}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1" data-testid={`text-experience-company-${exp.id}`}>
                                <Briefcase className="h-4 w-4" />
                                {exp.company}
                              </span>
                              <span className="flex items-center gap-1" data-testid={`text-experience-location-${exp.id}`}>
                                <MapPin className="h-4 w-4" />
                                {exp.location}
                              </span>
                              <span className="flex items-center gap-1" data-testid={`text-experience-dates-${exp.id}`}>
                                <Calendar className="h-4 w-4" />
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2" data-testid={`container-techstack-${exp.id}`}>
                            {exp.techStack.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs rounded-full"
                                data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}-${exp.id}`}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {/* Achievements */}
                          <ul className="space-y-2" data-testid={`list-achievements-${exp.id}`}>
                            {exp.achievements.map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="flex gap-3 text-sm text-foreground/90"
                                data-testid={`item-achievement-${exp.id}-${achIndex}`}
                              >
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
