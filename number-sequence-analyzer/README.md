# 🎮 Number Sequence Analyzer

A specialized web application for **game designers** to analyze numerical sequences and progression systems using AI integration. Designed to help identify patterns in game mechanics like XP curves, damage scaling, economy balancing, and progression formulas.

![Game Design Theme](https://img.shields.io/badge/Theme-Game%20Design-blueviolet) ![React](https://img.shields.io/badge/React-18.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-green) ![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-orange)

## 🎯 Target Users

- **Level designers** analyzing XP progression curves
- **Game economists** balancing in-game currencies and costs  
- **System designers** creating damage/health scaling formulas
- **Monetization specialists** optimizing IAP pricing tiers
- **Indie developers** reverse-engineering successful game mechanics

## ✨ Features

### MVP (Current Version)
- 🔑 **API Key Management**: Secure OpenRouter API integration
- 🤖 **Multiple AI Models**: Choose from GPT-3.5, Claude 3 Haiku, or Llama 3.1
- 📊 **Game-Focused Input**: Specialized interface for game progression data
- 🎨 **Game Design Theme**: Dark theme optimized for developers
- 📱 **Mobile Responsive**: Works on desktop, tablet, and mobile
- 💡 **Smart Analysis**: AI-powered sequence formatting and pattern recognition

### Coming Soon (Future Iterations)
- 📈 **Mathematical Analysis**: Automated difference calculations and growth rates
- 🔬 **Formula Derivation**: Precise mathematical formula identification
- 📊 **Chart Visualizations**: Interactive graphs and progression curves
- 🔗 **Wolfram Alpha Integration**: Advanced mathematical verification
- ✅ **Validation Tables**: Accuracy scoring and prediction capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/number-sequence-analyzer.git

# Navigate to project directory
cd number-sequence-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Usage

1. **Enter API Key**: Get your OpenRouter API key and enter it in the configuration section
2. **Select Model**: Choose from available AI models (GPT-3.5 Turbo recommended)
3. **Input Game Data**: Enter your sequence data in any format:
   ```
   XP Requirements: 100, 300, 600, 1000, 1500
   Damage Values: 10, 12, 15, 19, 24
   Building Costs: 50, 75, 112, 168, 252
   ```
4. **Analyze**: Click "🎮 Analyze Game Progression" to get AI-powered insights

## 🎮 Common Game Design Use Cases

| Pattern Type | Example Sequence | Game Mechanic |
|--------------|------------------|---------------|
| **Linear** | 100, 200, 300, 400 | Simple XP progression |
| **Quadratic** | 100, 400, 900, 1600 | Balanced scaling |
| **Exponential** | 10, 20, 40, 80, 160 | Late-game challenges |
| **Fibonacci** | 1, 1, 2, 3, 5, 8, 13 | Natural progression |
| **Custom** | 10, 15, 25, 50, 100 | Hybrid systems |
| **Piecewise** | 10, 20, 30, 50, 100, 200 | Multi-phase progression |

## 🛠️ Development

### Project Structure

```
number-sequence-analyzer/
├── src/
│   ├── components/          # React components
│   │   ├── ApiKeyInput.jsx
│   │   ├── ModelSelector.jsx
│   │   ├── SequenceTextArea.jsx
│   │   ├── SubmitButton.jsx
│   │   └── FormattedOutput.jsx
│   ├── services/           # API services
│   │   └── openRouterService.js
│   ├── App.jsx            # Main app component
│   ├── App.css           # Game design theme styles
│   └── main.jsx          # React entry point
├── public/               # Static assets
├── dist/                # Build output
└── vite.config.js       # Vite configuration
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Deploy to GitHub Pages (if configured)
```

### Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with CSS Variables (Dark Theme)
- **AI Integration**: OpenRouter API
- **Deployment**: GitHub Pages
- **Development**: ESLint + Modern JavaScript

## 🚀 Deployment

### GitHub Pages Deployment

1. **Prepare Repository**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch

3. **Deploy**:
   ```bash
   npm run build
   # Manually copy dist/ contents to gh-pages branch
   # Or set up GitHub Actions for automatic deployment
   ```

4. **Access**: Your app will be available at `https://yourusername.github.io/number-sequence-analyzer/`

### Manual Deployment

```bash
# Build the application
npm run build

# The dist/ folder contains all static files
# Upload contents to your web server
```

## 🎯 Game Design Examples

### XP Progression Analysis
```
Input: 100, 300, 600, 1000, 1500, 2100
Pattern: Quadratic progression
Formula: 50 * n * (n + 1)
Balance: Well-balanced for player retention
```

### Building Cost Progression  
```
Input: 10, 25, 50, 100, 200, 400
Pattern: Exponential with base ~2
Formula: 10 * 2^(n-1)
Balance: May cause player frustration after level 5
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Roadmap

### Epic 1: MVP ✅
- [x] Basic React app with Vite
- [x] OpenRouter API integration
- [x] Game design themed UI
- [x] Sequence input and formatting
- [x] GitHub Pages deployment

### Epic 2: Mathematical Analysis (Next)
- [ ] Automatic difference calculations
- [ ] Pattern recognition algorithms
- [ ] Structured JSON output from LLM
- [ ] Formula accuracy validation

### Epic 3: Visualization
- [ ] Interactive charts with Chart.js
- [ ] Progression curve visualization
- [ ] Comparison with industry standards
- [ ] Export capabilities

### Epic 4: Advanced Features
- [ ] Wolfram Alpha integration
- [ ] Batch analysis capabilities
- [ ] Save/load analysis sessions
- [ ] Team collaboration features

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenRouter for AI model access
- React and Vite communities
- Game design community for inspiration
- All contributors and testers

## 📞 Support

If you encounter issues or have questions:

1. Check the [Issues](https://github.com/yourusername/number-sequence-analyzer/issues) page
2. Create a new issue with detailed description
3. Include browser info and error messages

---

**Built with ❤️ for the game design community**
