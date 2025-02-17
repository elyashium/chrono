# Chrono - Web Page Reading Time Estimator

A lightweight Chrome extension that provides real-time reading time estimates for web pages, helping users better manage their reading time. Features a premium UI with intelligent content detection and customizable settings.

## Features

- ⏱️ Real-time reading time estimation for any webpage
- 📊 Dynamic progress tracking with animated circle
- 🎨 Premium UI with animated gradient backgrounds
- 🌓 Dark/Light theme support with glass morphism
- 📍 Customizable widget positioning
- 🎯 Intelligent content detection
- 🤖 AI-generated content support
- 🔒 Minimal permissions required for operation
- 💾 Persistent user preferences

## Installation

1. Clone this repository:
```bash
git clone [your-repository-url]
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the project directory containing manifest.json

## Technical Details

### Manifest Overview
The extension uses Manifest V3 with the following key features:
- Manifest Version: 3
- Permissions: 
  - `activeTab`: For accessing current tab content
  - `scripting`: For injecting reading time calculation scripts
  - `storage`: For saving user preferences
- Content Scripts: Automatically runs on all URLs to calculate reading time

### Project Structure

```
├── src/
│   ├── components/
│   │   ├── Widget.jsx    # Main widget component
│   │   ├── Settings.jsx  # Settings panel
│   │   └── Slider.jsx    # Reading speed slider
│   ├── contexts/
│   │   └── SettingsContext.jsx  # Settings management
│   ├── hooks/
│   │   ├── useScrollProgress.js # Scroll tracking
│   │   └── useStorage.js        # Chrome storage management
│   ├── content/
│   │   └── content.jsx    # Content script
│   └── App.jsx            # Popup component
├── public/                # Static assets
└── manifest.json          # Extension configuration
```

## Development

### Prerequisites

- Node.js (latest LTS version recommended)
- Chrome browser

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

### Loading in Chrome

1. Build the project
2. Open Chrome Extensions page
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select the built extension directory

## How It Works

The extension provides several key features:

1. **Content Analysis**
   - Intelligently detects main content area
   - Supports AI-generated content (LLM responses)
   - Filters out UI elements and navigation

2. **Reading Progress**
   - Animated progress circle
   - Current section tracking
   - Estimated completion time
   - Word count statistics

3. **Customization**
   - Theme switching (Dark/Light)
   - Widget positioning
   - Reading speed adjustment (WPM)
   - Toggleable UI elements

4. **Technical Implementation**
   - Uses Shadow DOM for style isolation
   - Optimized scroll performance
   - Persistent settings storage
   - Premium UI with animated gradients

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, bug reports, or feature requests, please open an issue in the GitHub repository.