# Subhro Pal - Portfolio

A modern, interactive portfolio website showcasing data science and AI engineering projects with stunning 3D animated backgrounds.

![Portfolio Preview](public/lovable-uploads/screenshot.png)

## 🚀 Features

- **Interactive 3D Background**: WebGL-powered animated wave background with mouse tracking
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Project Showcase**: Featured machine learning and AI projects
- **Certifications**: Professional certifications with interactive image previews
- **Contact Form**: EmailJS integration for direct communication
- **Tech Stack Display**: Colorful icons showing technical expertise

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **3D Graphics**: Three.js with custom GLSL shaders
- **Icons**: React Icons
- **Email**: EmailJS
- **Animations**: CSS3 + Framer Motion concepts

## 📦 Installation

```sh
# Clone the repository
git clone https://github.com/SHHUUBBH/PORTFOLIO.git

# Navigate to project directory
cd PORTFOLIO

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build for Production

```sh
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📝 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── About.tsx       # About section
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── FloatingLines.tsx  # 3D background
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Projects.tsx
├── assets/             # Images and static files
├── lib/                # Utility functions
└── pages/              # Page components
```

## 🎨 Customization

### Background Settings
The interactive background can be customized through the CustomizePanel component, allowing control over:
- Wave colors and intensity
- Animation speed
- Parallax effects
- Mouse interaction strength

### Color Theme
Primary colors are defined in `src/index.css`:
- Primary: `#9500ff` / `#7c00ff`
- Dark mode optimized

## 📧 Contact Integration

The contact form uses EmailJS. To set up:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Update service ID, template ID, and public key in `Contact.tsx`

## 🌐 Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Subhro Pal**
- GitHub: [@SHHUUBBH](https://github.com/SHHUUBBH)
- LinkedIn: [Subhro Pal](https://www.linkedin.com/in/subhro-pal-b00a60356)
- Email: shubhropal62@gmail.com

---

⭐ Star this repo if you like it!

## How to run locally

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/SHHUUBBH/PORTFOLIO.git

# Step 2: Navigate to the project directory.
cd PORTFOLIO

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Three.js

## How to run locally

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to various platforms:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Features

- Interactive 3D background with WebGL shaders
- Responsive design with Tailwind CSS
- Dark mode optimized
- Contact form integration with EmailJS
- Customizable wave animations
- Certifications section showcasing professional achievements
