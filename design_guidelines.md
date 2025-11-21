# Portfolio Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Modern SaaS portfolio aesthetic inspired by Linear (clean typography, spacious layouts) + Apple (minimalist approach) + Stripe (restrained color usage, professional polish)

## Typography
- **Headings**: Inter, 48-56px (desktop hero), 32-40px (section headers), bold weight
- **Body**: Inter, 16-18px, regular weight
- **Small text**: 14px for metadata, dates, captions
- **Muted text**: #94a3b8 for secondary information

## Layout System
- **Spacing**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, p-6, p-8, py-12, py-16, py-20, py-24)
- **Containers**: max-w-7xl for full sections, max-w-4xl for content-focused areas
- **Generous whitespace**: py-20 to py-24 between major sections

## Color Palette
- **Primary (Navy)**: #0f172a - headers, dark mode backgrounds
- **Accent (Cyan)**: #06b6d4 - links, highlights, skill tags
- **CTA (Purple)**: #7c3aed - primary action buttons
- **Muted**: #94a3b8 - secondary text, borders
- **Light backgrounds**: White (#ffffff) and subtle grays (#f8fafc, #f1f5f9)

## Component Library

### Hero Section (Full viewport height)
- Large professional photo slot (circular or rounded square, 200-300px)
- Name display: 48-56px bold
- Professional tagline: 20-24px, muted color
- Two-button CTA group: "View Resume" (dropdown with SDE/AI options) + "Contact" button
- Subtle geometric SVG background pattern or gradient overlay

### About Section
- Single paragraph professional summary (max-w-3xl centered)
- 3 highlight chips below (pill-shaped, cyan accent background, rounded-full)
- Clean card with soft shadow and 2xl rounded corners

### Skills Section
- Grouped into 6 categories with labeled dividers
- Pill-shaped skill tags with cyan accent borders
- Search/filter input at top (rounded-lg input with icon)
- Grid layout: 3-4 columns desktop, 2 columns tablet, 1 column mobile

### Experience Timeline
- Vertical timeline with connecting lines
- Each entry: glassmorphism card with:
  - Company logo placeholder (48px circle)
  - Role title (20px bold)
  - Date range (14px muted)
  - Tech stack pills (smaller, outlined)
  - 3-5 achievement bullets (16px with checkmark icons)

### Projects Showcase
- 2-column grid (desktop), 1-column (mobile)
- 6 featured project cards with:
  - Screenshot/GIF slot (16:9 aspect ratio, rounded-t-2xl)
  - Project title (24px bold)
  - Problem statement (2-3 lines, muted)
  - Tech stack pills
  - Outcome metrics (highlighted numbers with labels)
  - GitHub link icon button

### Research & Publications
- Clean list layout with publication badges
- Paper title (18px bold), status chip, citation format

### Certifications & Awards
- Grid of badge cards (3-4 columns)
- Icon/logo slot, cert name, issuing org, date
- Soft hover lift effect

### Contact Section
- Two-column layout: Form (left) + Info cards (right)
- Form fields: Name, Email, Message (all rounded-lg, border focus state)
- Submit button (purple CTA, full-width)
- Info cards: Email, Phone, LinkedIn, GitHub with icons

### Navigation
- Fixed top nav with glassmorphism effect on scroll
- Logo/name (left), menu items (right), theme toggle
- Hamburger menu for mobile (slide-in drawer)

### Footer
- 3-column layout: Copyright | Quick links | Download resume buttons
- Small text (14px), muted color, subtle top border

## Animations (Framer Motion - Minimal)
- **Section entrance**: Subtle upward slide (20px) + fade-in on scroll
- **Button hover**: Micro bounce (scale 1.05), smooth transition
- **Card hover**: Slight lift (translateY -4px) + shadow increase
- No distracting parallax or continuous animations

## Images
- **Hero image**: Professional headshot, circular or rounded-square mask, 200-300px diameter, positioned prominently in hero section
- **Project screenshots**: 6 project preview images (16:9 ratio, rounded corners), can be placeholders initially with descriptive alt text
- **Background**: Subtle geometric SVG pattern or gradient overlay in hero (low opacity, non-distracting)
- **Buttons on hero**: If CTAs overlay hero image, use backdrop-blur-md with semi-transparent background

## Design Patterns
- **Glassmorphism cards**: backdrop-blur, semi-transparent backgrounds, subtle borders
- **2xl rounded corners** throughout (rounded-2xl, rounded-3xl for cards)
- **Soft shadows**: shadow-lg for cards, shadow-xl on hover
- **Pill-shaped elements**: rounded-full for chips, tags, and status badges
- **Consistent icon usage**: Lucide icons, 20-24px size, stroke-2 width

## Dark/Light Mode
- Toggle switch in top nav (moon/sun icon)
- Dark mode: #0f172a backgrounds, lighter text (#e2e8f0)
- Light mode: White/gray backgrounds, #0f172a text
- Smooth transition between modes (200ms)

## Mobile Responsiveness
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack all multi-column layouts to single column on mobile
- Hamburger menu replaces horizontal nav below 768px
- Touch-friendly button sizes (min 44px height)
- Optimize font sizes for readability on small screens

## Accessibility
- Semantic HTML5 tags (header, nav, main, section, footer)
- Alt text for all images and icons
- Keyboard navigation support with visible focus states
- WCAG AA color contrast ratios maintained
- Aria labels for interactive elements

## Print Styles
- Single-page resume layout when printing
- Hide navigation, footer, decorative elements
- Black text on white background
- Optimize spacing for standard paper (A4/Letter)