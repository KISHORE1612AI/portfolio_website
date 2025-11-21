import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Portfolio Content Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  photo: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  cgpa: string;
}

export interface SkillsGroup {
  Languages: string[];
  Backend: string[];
  Frontend: string[];
  "ML & Data": string[];
  "Cloud & DevOps": string[];
  Tools: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  achievements: string[];
}

export interface ProjectOutcome {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  technologies: string[];
  outcomes: ProjectOutcome[];
  github: string;
  image: string;
}

export interface Research {
  title: string;
  status: string;
  venue: string;
  year: string;
  authors: string;
  abstract: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface PortfolioContent {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: SkillsGroup;
  experience: Experience[];
  projects: Project[];
  research: Research[];
  certifications: Certification[];
  awards: Award[];
}

// Contact Form Schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Photo upload schema
export const photoUploadSchema = z.object({
  photo: z.string().url().or(z.string().startsWith('data:image')),
});

export type PhotoUpload = z.infer<typeof photoUploadSchema>;
