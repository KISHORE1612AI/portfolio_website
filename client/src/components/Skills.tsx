import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import type { SkillsGroup } from '@shared/schema';

interface SkillsProps {
  skills: SkillsGroup;
}

export function Skills({ skills }: SkillsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return skills;

    const query = searchQuery.toLowerCase();
    const filtered: Partial<SkillsGroup> = {};

    const typedEntries = Object.entries(skills) as Array<[keyof SkillsGroup, string[]]>;

    typedEntries.forEach(([category, skillList]) => {
      const matchingSkills = skillList.filter((skill) =>
        skill.toLowerCase().includes(query)
      );
      if (matchingSkills.length > 0) {
        filtered[category] = matchingSkills;
      }
    });

    return filtered as SkillsGroup;
  }, [skills, searchQuery]);

  const categories = Object.keys(filteredSkills) as Array<keyof SkillsGroup>;

  return (
    <section id="skills" className="py-20 sm:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" data-testid="heading-skills">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" data-testid="icon-search-skills" />
              <Input
                type="search"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-skills"
              />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8">
            {categories.length > 0 ? (
              categories.map((category, categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <Card className="p-6" data-testid={`card-skill-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h3 className="text-xl font-semibold mb-4 text-foreground" data-testid={`heading-skill-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills[category]?.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        >
                          <Badge
                            variant="outline"
                            className="px-3 py-1 text-sm border-accent/50 text-accent-foreground hover-elevate rounded-full"
                            data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-12" data-testid="card-no-skills-found">
                <p className="text-center text-muted-foreground" data-testid="text-no-skills-message">
                  No skills found matching "{searchQuery}"
                </p>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
