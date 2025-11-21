# Portfolio Website - Kishore Kumar S S

## Overview

This is a modern, single-page portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. The application showcases professional experience, projects, skills, research, and certifications with a focus on clean design, accessibility, and responsive layouts. The portfolio features dark/light theme switching, interactive sections with smooth animations, and PDF resume download capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**React SPA with TypeScript**: Single-page application built using React 18+ with full TypeScript support for type safety. The application uses a component-based architecture with modular, reusable UI components.

**Routing**: Implements client-side routing using `wouter` (lightweight alternative to React Router). Currently configured with a single main portfolio page route and a 404 fallback.

**State Management**: Uses React's built-in state management (useState, useContext) combined with React Query (@tanstack/react-query) for server state management. Theme preferences are managed through a custom ThemeContext provider with localStorage persistence.

**UI Component Library**: Built on shadcn/ui design system with Radix UI primitives, providing accessible, customizable components. All UI components follow the "New York" style variant with custom theming support.

**Styling Approach**: Tailwind CSS utility-first framework with extensive custom CSS variables for theming. Supports light/dark modes with CSS variables that adjust based on the `dark` class on the document root. Custom utility classes include hover/active elevation effects and print-specific styles.

**Animation**: Framer Motion for declarative animations including scroll-triggered entrance animations (whileInView), hover effects, and interactive transitions.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form validation and submission.

### Backend Architecture

**Express.js Server**: Node.js backend using Express with TypeScript. Supports both development (with Vite middleware) and production modes with different entry points.

**Development Server**: Integrates Vite dev server as middleware for hot module replacement and fast refresh during development. Uses custom error overlays and development banners via Replit-specific plugins.

**Production Build**: Serves static files from the `dist/public` directory after Vite builds the client application. Falls back to index.html for client-side routing.

**API Structure**: RESTful API endpoints including:
- `/api/contact` - POST endpoint for contact form submissions
- `/api/upload-photo` - POST endpoint for profile photo uploads (multipart/form-data)
- `/api/content` - PUT endpoint for updating portfolio content
- Resume download endpoints for SDE and AI resume PDFs

**Storage Layer**: In-memory storage implementation (MemStorage class) for contact form submissions. Designed with an interface (IStorage) that could be swapped for database implementations.

### Data Storage

**Content Management**: Portfolio content stored in `client/public/content.json` with a strongly-typed schema defined in `shared/schema.ts`. This JSON file acts as a simple CMS containing personal info, education, skills, experience, projects, research, certifications, and awards.

**File Storage**: Resume PDFs stored in `attached_assets/` directory with fallback checking for multiple file naming patterns. Profile photos can be uploaded and stored as base64 data URLs (development approach) or cloud storage URLs (production-ready architecture).

**Database Configuration**: Drizzle ORM configured with PostgreSQL support (via Neon serverless driver), though not actively used in current implementation. Schema defined but database operations are handled through in-memory storage currently.

### Authentication & Authorization

**Current State**: No authentication implemented. This is a public portfolio website with no protected routes or user accounts.

**Contact Form**: Basic form validation without authentication. Form submissions stored in memory (production would require email service integration or database persistence).

### External Dependencies

**UI & Styling**:
- Radix UI (@radix-ui/*) - Accessible component primitives
- Tailwind CSS - Utility-first styling
- Framer Motion - Animation library
- Lucide React - Icon library
- class-variance-authority, clsx - Utility for conditional classNames

**Form & Validation**:
- React Hook Form - Form state management
- Zod - Runtime type validation
- @hookform/resolvers - React Hook Form + Zod integration

**Build & Development**:
- Vite - Frontend build tool and dev server
- esbuild - Backend bundler for production
- TypeScript - Type checking
- PostCSS, Autoprefixer - CSS processing

**Backend**:
- Express.js - Web server framework
- Multer - File upload handling
- @neondatabase/serverless - PostgreSQL driver (Neon)
- Drizzle ORM - Database toolkit (configured but not actively used)
- connect-pg-simple - PostgreSQL session store (available but not used)

**Replit-Specific**:
- @replit/vite-plugin-runtime-error-modal - Development error overlay
- @replit/vite-plugin-cartographer - Code navigation
- @replit/vite-plugin-dev-banner - Development environment banner

**Design System**: Based on shadcn/ui component library with custom color palette supporting navy (#0f172a), cyan accent (#06b6d4), and purple CTA (#7c3aed) colors. Design follows modern SaaS aesthetics inspired by Linear, Apple, and Stripe.

**Fonts**: Inter font family loaded from Google Fonts with multiple weights (300-900).

**No External APIs**: Currently all functionality is self-contained. Future integrations could include email services (Formspree, SendGrid) for contact form and GitHub API for stats/repositories.