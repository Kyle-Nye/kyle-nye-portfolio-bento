# Kyle Nye - AI Solutions Architect Portfolio

A modern, interactive portfolio showcasing AI engineering and systems reliability expertise with a Bento grid layout and live automation demonstrations.

## ✨ Features

- **🎨 Bento Grid Layout** - Industrial minimal design with dark mode and amber accents
- **🤖 Live Automation Engine** - Real-time simulation of n8n workflows with streaming draft preview
- **📊 Dynamic GitHub Integration** - Live repository data with intelligent caching (5-min TTL)
- **🎯 Career Evolution Timeline** - Interactive journey from Autonomous Vehicles to AI Agents
- **💻 Live Code Snippets** - Syntax-highlighted examples with GitHub links
- **🔒 Security Hardened** - CSP headers, no API key exposure, input sanitization
- **⚡ Real Network Monitoring** - Live latency calculation and display
- **🔍 SEO Optimized** - Meta tags, Open Graph, structured content

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **API Integration:** GitHub REST API
- **State Management:** React Hooks + Context

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Kyle-Nye/kyle-nye-portfolio-bento.git
cd kyle-nye-portfolio-bento

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📦 Project Structure

```
├── components/          # React components
│   ├── AutomationEngine.tsx     # Live workflow simulator
│   ├── GitHubActivityCard.tsx   # Live GitHub repos
│   ├── SkillsEvolution.tsx      # Career timeline
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API services (GitHub)
├── types/              # TypeScript definitions
├── constants.ts        # Portfolio content data
└── index.tsx          # App entry point
```

## 🎯 Key Components

### Automation Engine
Real-time simulation of AI content workflow with character-by-character streaming effect, demonstrating:
- Multi-agent orchestration
- Research → Draft → Review → Publish pipeline
- Dynamic scenario generation

### GitHub Integration
Live data fetching with:
- 5-minute cache strategy
- Automatic cache cleanup
- Fallback data on API errors
- Rate limit handling

### Skills Evolution
Interactive career timeline showcasing:
- Marketing & Content Strategy (2015-Present)
- Autonomous Vehicle Systems (Tesla, Zoox, Nuro)
- AI Solutions Architecture (2024-Present)

## 🔒 Security Features

- ✅ Content Security Policy (CSP) headers
- ✅ No API keys in frontend code
- ✅ XSS protection via React's built-in escaping
- ✅ HTTPS enforcement
- ✅ Secure external resource loading
- ✅ Zero npm audit vulnerabilities

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Import repository in Vercel
3. Deploy (zero configuration needed)

### Environment Variables
No environment variables needed for production deployment. The site uses public GitHub API endpoints only.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Connect

- **GitHub:** [Kyle-Nye](https://github.com/Kyle-Nye)
- **LinkedIn:** [kylejnye](https://linkedin.com/in/kylejnye)
- **Email:** kyle.j.nye@proton.me

---

Built with ❤️ using AI-Native development workflows
