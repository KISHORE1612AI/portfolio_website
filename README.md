# Kishore Kumar S S - Portfolio Website

A modern, professional, single-page portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light mode, responsive design, PDF resume downloads, and a beautiful glassmorphism UI.

## ✨ Features

- **Modern Design**: Clean, minimal interface with glassmorphism effects and smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Interactive Sections**:
  - Hero section with professional photo upload/URL capability
  - About section with education and highlights
  - Skills section with search/filter functionality
  - Experience timeline with detailed achievements
  - Projects showcase with 6 featured projects
  - Research & Publications section
  - Certifications & Awards display
  - Contact form with validation
- **Resume Downloads**: Dual resume versions (SDE & AI) available for download
- **Print-to-PDF**: Print-optimized CSS for exporting portfolio as PDF
- **SEO Optimized**: Complete meta tags and Open Graph support
- **Accessible**: WCAG-compliant with keyboard navigation and proper contrast
- **Editable Content**: Easy content management through `content.json`

## 🚀 Getting Started on Replit

### Prerequisites

This project runs on Replit with Node.js 20 already configured.

### Installation & Running

1. **Install Dependencies** (automatically handled on Replit):
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   - Click the "Run" button in Replit, or
   - Use the terminal:
     ```bash
     npm run dev
     ```

3. **Access the Portfolio**:
   - The app will be available at your Replit URL (typically `https://<your-repl-name>.<your-username>.replit.app`)
   - In development, it runs on port 5000

### Workflow

The "Start application" workflow runs `npm run dev` which:
- Starts the Express backend server
- Starts the Vite frontend dev server
- Serves the portfolio on a single port with hot-reload enabled

## 📁 Project Structure

```
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── Navigation.tsx   # Top navigation bar
│   │   │   ├── Hero.tsx         # Hero section
│   │   │   ├── About.tsx        # About section
│   │   │   ├── Skills.tsx       # Skills section
│   │   │   ├── Experience.tsx   # Experience timeline
│   │   │   ├── Projects.tsx     # Projects showcase
│   │   │   ├── Research.tsx     # Research & Publications
│   │   │   ├── Certifications.tsx # Certifications & Awards
│   │   │   ├── Contact.tsx      # Contact form
│   │   │   └── Footer.tsx       # Footer
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx # Dark/light mode provider
│   │   ├── pages/
│   │   │   └── Portfolio.tsx    # Main portfolio page
│   │   ├── App.tsx              # App root
│   │   └── index.css            # Global styles
│   └── index.html               # HTML entry point
├── server/                      # Backend application
│   ├── routes.ts                # API routes
│   └── storage.ts               # Data storage interface
├── shared/
│   └── schema.ts                # TypeScript types & schemas
├── content.json                 # Editable portfolio content
└── README.md                    # This file
```

## 📝 Updating Content

### Method 1: Edit `content.json` (Recommended)

The entire portfolio content is stored in `content.json`. Edit this file to update:

- **Personal Information**: Name, title, email, phone, social links, summary, highlights
- **Education**: Degrees, institutions, dates, CGPA
- **Skills**: Organized by categories (Languages, Backend, Frontend, ML & Data, Cloud & DevOps, Tools)
- **Experience**: Companies, roles, dates, tech stacks, achievements
- **Projects**: Titles, descriptions, problems, approaches, technologies, outcomes, GitHub links
- **Research**: Publications, status, venues, authors, abstracts
- **Certifications**: Names, issuers, dates
- **Awards**: Titles, organizations, dates, descriptions

Example structure:
```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    ...
  },
  "skills": {
    "Languages": ["Python", "JavaScript", ...],
    ...
  },
  ...
}
```

### Method 2: Add Resume PDFs ⚠️ REQUIRED

**IMPORTANT:** Resume download buttons will show an instructional page until you add actual PDF files.

**To enable resume downloads:**

1. Create or export your resumes as PDF files
2. Place them in the `attached_assets/` directory with exact names:
   - `SDE_Resume.pdf` - Software Development Engineer version
   - `AI_Resume.pdf` - AI/ML Engineer version
3. No code changes needed - downloads work immediately after adding files

**Current Status:**
- ✅ Download buttons functional and styled correctly
- ✅ Backend routes configured and working  
- ⚠️ Shows instructional page (PDFs not yet uploaded)
- ✅ Add PDFs → downloads work automatically

### Method 3: Update Profile Photo

You can update your profile photo in two ways:
1. **Upload**: Hover over the profile photo in the Hero section and click the upload icon
2. **URL**: Click the link icon and enter an image URL
3. **Edit content.json**: Set the `personalInfo.photo` field to an image URL

## 🎨 Customizing Design

### Change Colors

Edit `client/src/index.css` variables in the `:root` section:

```css
:root {
  --primary: 262 83% 58%;     /* Purple - Main brand color */
  --accent: 189 94% 43%;      /* Cyan - Accent color */
  --background: 222 47% 98%;  /* Light background */
  --foreground: 222 47% 11%;  /* Dark text */
  ...
}
```

Colors are in HSL format: `Hue Saturation% Lightness%`

### Change Fonts

The project uses **Inter** font by default. To change:

1. Update `client/index.html` to import your desired Google Font
2. Update `tailwind.config.ts`:
   ```typescript
   fontFamily: {
     sans: ["YourFont", "var(--font-sans)"],
   }
   ```

### Modify Spacing & Layout

- Adjust section spacing in individual components (look for `py-20`, `py-24` classes)
- Modify container widths using `max-w-7xl`, `max-w-5xl` classes
- Edit component-specific styles in each component file

## 🔧 Technical Details

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Express.js, Node.js
- **Forms**: React Hook Form, Zod validation
- **State**: TanStack Query (React Query)

### API Endpoints

The backend provides these endpoints:

- `GET /api/resume/sde` - Download SDE resume PDF
- `GET /api/resume/ai` - Download AI resume PDF
- `POST /api/contact` - Submit contact form
- `PUT /api/content` - Update portfolio content
- `GET /content.json` - Fetch portfolio content

### Environment Variables

Create a `.env` file if needed for:
- Contact form integration (e.g., Formspree API key)
- Any third-party services

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🖨️ Print-to-PDF

Click the "Print" button in the footer or use `Ctrl/Cmd + P` to generate a PDF version of your portfolio. The print stylesheet automatically:
- Hides navigation and footer
- Optimizes spacing for paper
- Converts to black & white
- Ensures proper page breaks

## 🚀 Deployment

### Deploy to Replit

1. Ensure your Replit is running properly
2. Click "Publish" in Replit to get a permanent URL
3. Your portfolio will be available at `https://<your-repl-name>.<your-username>.replit.app`

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform supporting Node.js:
- **Netlify**: Similar to Vercel setup
- **Railway**: Connect GitHub and deploy
- **Render**: Deploy as a web service

## 🧪 Testing

Run tests (when implemented):
```bash
npm test
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📄 License

© 2024 Kishore Kumar S S. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!

## 📞 Support

For questions or issues:
- Email: kishorekumar@example.com
- GitHub: https://github.com/kishorekumarss
- LinkedIn: https://linkedin.com/in/kishorekumarss

---

**Built with ❤️ using React, TypeScript & Tailwind CSS**
