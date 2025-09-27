# Agro-Sevak 🌾

An intelligent agricultural assistance application that provides farmers with AI-powered advice, weather information, crop diagnosis, and market price insights. Built with modern web technologies to deliver a seamless mobile-first experience.

## Features 🚀

### 🤖 AI-Powered Agricultural Chat
- Intelligent farming advice using Groq AI API
- Weather-aware recommendations
- Voice input and output support
- Context-aware conversations about crops, diseases, and farming practices

### 🌦️ Weather Integration
- Real-time location-based weather data
- Weather forecasts for agricultural planning
- Automatic location detection with IP-based fallback

### 🔍 Crop Diagnosis
- AI-powered crop disease identification
- Treatment recommendations
- Preventive measures suggestions

### 📊 Market Prices
- Real-time crop market prices
- Price trends and analytics
- Support for various crops and commodities

### 📱 Mobile-First Design
- Progressive Web App (PWA) capabilities
- Responsive design for all devices
- Offline functionality
- Clean, intuitive interface

## Tech Stack 🛠️

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components

### AI & APIs
- **Groq SDK** - Fast AI inference for agricultural advice
- **Speech Recognition API** - Voice input capabilities
- **Geolocation API** - Location-based weather data
- **Weather API** - Real-time weather information

### State Management & Routing
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **React Context** - Theme and global state management

### Additional Features
- **PWA Support** - Installable web app with service worker
- **IndexedDB** - Local data storage
- **Workbox** - PWA utilities and caching strategies

## Getting Started 🏁

### Prerequisites
- Node.js 16+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd krishi-sahayak
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using bun (recommended)
   bun install
   ```

3. **Set up Groq AI API** (Required for AI features)
   - Visit [Groq Console](https://console.groq.com)
   - Create an account and get your API key
   - See `GROQ_SETUP.md` for detailed setup instructions

4. **Start development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using bun
   bun run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## Project Structure 📁

```
src/
├── components/
│   ├── layout/          # Layout components (headers, navigation)
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts (theme, etc.)
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API clients
├── pages/               # Page components (routes)
└── types/               # TypeScript type definitions
```

## Available Scripts 📝

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Key Features Documentation 📖

### Agricultural Chat
The AI chat system provides intelligent responses about:
- Crop cultivation techniques
- Disease identification and treatment
- Soil management
- Seasonal farming advice
- Weather-based recommendations

### Weather Integration
- Automatic location detection
- IP-based location fallback
- 7-day weather forecasts
- Agricultural weather alerts

### Market Prices
- Real-time commodity prices
- Historical price trends
- Regional market data
- Price comparison tools

## Environment Variables 🔐

Create a `.env.local` file for local development:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_WEATHER_API_KEY=your_weather_api_key_here
```

## Deployment 🚀

### Build for Production
```bash
npm run build
```

The `dist` folder contains the production-ready files.

### Deployment Options
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Railway**
- **Any static hosting service**

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the `GROQ_SETUP.md` for AI configuration help

---

**Made with ❤️ for farmers and agricultural communities**
