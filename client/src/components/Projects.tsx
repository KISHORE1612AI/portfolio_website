import { Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import type { Project } from '@shared/schema';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 sm:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-projects">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`card-project-${project.id}`}
              >
                <Card className="h-full flex flex-col hover-elevate">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid={`text-project-description-${project.id}`}>
                      {project.description}
                    </p>

                    {/* Problem */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground/80 mb-1" data-testid={`heading-project-problem-${project.id}`}>
                        Problem
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-problem-${project.id}`}>
                        {project.problem}
                      </p>
                    </div>

                    {/* Approach */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground/80 mb-1" data-testid={`heading-project-approach-${project.id}`}>
                        Approach
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-project-approach-${project.id}`}>
                        {project.approach}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4" data-testid={`container-techstack-${project.id}`}>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs rounded-full"
                            data-testid={`badge-tech-${tech.toLowerCase().replace(/\s+/g, '-')}-${project.id}`}
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 6 && (
                          <Badge variant="secondary" className="text-xs rounded-full" data-testid={`badge-tech-more-${project.id}`}>
                            +{project.technologies.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="grid grid-cols-3 gap-3 mb-6" data-testid={`container-outcomes-${project.id}`}>
                      {project.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className="text-center p-3 rounded-lg bg-accent/10 border border-accent/30"
                          data-testid={`card-outcome-${i}-${project.id}`}
                        >
                          <div className="text-xl font-bold text-accent-foreground" data-testid={`text-outcome-metric-${i}-${project.id}`}>
                            {outcome.metric}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1" data-testid={`text-outcome-label-${i}-${project.id}`}>
                            {outcome.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    <div className="mt-auto">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                        data-testid={`link-github-${project.id}`}
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          View on GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
