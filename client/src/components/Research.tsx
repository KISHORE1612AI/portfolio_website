import { FileText, Users, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { Research as ResearchType } from '@shared/schema';

interface ResearchProps {
  research: ResearchType[];
}

export function Research({ research }: ResearchProps) {
  return (
    <section id="research" className="py-20 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-research">
            Research & Publications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-16 rounded-full" />

          <div className="max-w-5xl mx-auto space-y-6">
            {research.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`card-research-${index}`}
              >
                <Card className="p-6 hover-elevate">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center" data-testid={`icon-research-${index}`}>
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Title and Status */}
                      <div className="flex flex-wrap items-start gap-3">
                        <h3 className="text-lg font-bold text-foreground flex-1" data-testid={`text-research-title-${index}`}>
                          {paper.title}
                        </h3>
                        <Badge
                          variant={paper.status === 'Published' ? 'default' : 'secondary'}
                          className="rounded-full"
                          data-testid={`badge-research-status-${index}`}
                        >
                          {paper.status}
                        </Badge>
                      </div>

                      {/* Venue and Year */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2" data-testid={`text-research-venue-${index}`}>
                          <FileText className="h-4 w-4" />
                          {paper.venue}
                        </span>
                        <span className="flex items-center gap-2" data-testid={`text-research-year-${index}`}>
                          <Calendar className="h-4 w-4" />
                          {paper.year}
                        </span>
                      </div>

                      {/* Authors */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`text-research-authors-${index}`}>
                        <Users className="h-4 w-4" />
                        <span>{paper.authors}</span>
                      </div>

                      {/* Abstract */}
                      <p className="text-sm text-foreground/80 leading-relaxed" data-testid={`text-research-abstract-${index}`}>
                        {paper.abstract}
                      </p>
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
