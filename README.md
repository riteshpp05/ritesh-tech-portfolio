# Ritesh Patil — AI/ML Engineer Portfolio

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black.svg)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green.svg)](https://greensock.com/gsap/)

A highly interactive, 3D-accelerated personal portfolio showcasing projects and skills in AI/ML, Generative AI, RAG Systems, Agentic AI, and Cloud Infrastructure. Built with React, Three.js (React Three Fiber), and GSAP for premium smooth scrolling and animations.

## 🚀 Features
- **3D Tech Stack Animation:** Interactive 3D spheres with dynamic textures representing modern AI/ML technologies, complete with physics and collisions using Rapier.
- **GSAP Smooth Scrolling:** Silky smooth inertia scrolling, staggered text reveals, and scroll-linked animations.
- **Custom Shader & Lighting:** Dynamic point lights tied to viewport interactions.
- **Optimized Performance:** Lazy-loaded textures, compressed 3D models (Draco), and efficient WebGL rendering.

## 💻 Tech Stack
- **Frontend Framework:** React 18, TypeScript, Vite
- **3D Engine & Physics:** Three.js, React Three Fiber, React Three Rapier
- **Animations:** GSAP (ScrollTrigger, ScrollSmoother)
- **Styling:** Custom CSS with CSS Variables

## 📁 Folder Structure
```text
portfolio/
├── public/                # Static assets
│   ├── assets/logos/      # Official tech stack SVG icons
│   ├── images/            # Project thumbnails and mockups
│   ├── models/            # 3D models (GLB, HDR)
│   └── Ritesh_Patil.pdf   # Downloadable Resume
├── src/
│   ├── components/        # React components (UI, 3D Canvas, Sections)
│   ├── context/           # React context providers (Loading state)
│   ├── data/              # Static configurations
│   ├── App.tsx            # Main application wrapper
│   └── main.tsx           # Entry point
├── index.html             # HTML template with SEO tags
├── package.json           # Project dependencies & scripts
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite bundler configuration
```

## 🛠️ Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

## 📦 Build & Deployment

To create a production build:
```bash
npm run build
```

This will generate an optimized build in the `dist` folder. You can test it locally using:
```bash
npm run preview
```

### Deploying to Vercel/Netlify
This Vite project is ready to be deployed out of the box to Vercel, Netlify, or GitHub Pages. Just link your repository to the platform and set the build command to `npm run build` and publish directory to `dist`.

## 📬 Contact
- **LinkedIn:** [Ritesh Patil](https://www.linkedin.com/in/riteshpatil-32946b26b)

---
*MIT License - Copyright (c) 2026 Ritesh Patil*
