# Chrono - Web Page Reading Time Estimator

A lightweight Chrome extension that provides real-time reading time estimates for web pages, helping users better manage their reading time.

## Features

- ⏱️ Real-time reading time estimation for any webpage
- 📊 Simple, unobtrusive display in webpage
- 🚀 Works automatically on all websites
- 🎯 Lightweight and performance-focused
- 🔒 Minimal permissions required for operation

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
- Content Scripts: Automatically runs on all URLs to calculate reading time

### Project Structure

```
├── src/
│   ├── content/      # Content script with reading time logic
│   │   └── index.jsx # Main content script
│   └── App.jsx       # Popup component
├── public/           # Static assets
└── manifest.json     # Extension configuration
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

The extension injects a content script (index.jsx) into every webpage, which:
1. Analyzes the page content
2. Calculates estimated reading time
3. Displays the result in an unobtrusive manner

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