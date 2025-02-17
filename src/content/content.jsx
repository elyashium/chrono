import { createRoot } from 'react-dom/client'
import Widget from '../components/Widget'
import { StrictMode } from 'react'
import { SettingsProvider } from '../contexts/SettingsContext'

// Create container for widget
const widgetRoot = document.createElement('div')
widgetRoot.id = 'chrono-widget-root'
document.body.appendChild(widgetRoot)

// Create shadow root for style isolation
const shadowRoot = widgetRoot.attachShadow({ mode: 'open' })

// Inject Tailwind classes
const style = document.createElement('style')
style.textContent = `
  /* Base styles */
  :host {
    --primary: #f59e0b;
    --text: #ffffff;
    --bg: rgba(0, 0, 0, 0.8);
  }

  /* Theme variations */
  :host([data-theme="light"]) {
    --primary: #f59e0b;
    --text: #1f2937;
    --bg: rgba(255, 255, 255, 0.8);
  }

  .widget-container {
    position: fixed;
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
    transition: all 0.3s ease;
  }

  /* Premium Gradient Backgrounds */
  .dark-gradient {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(20, 20, 20, 0.8) 100%
    );
    backdrop-filter: blur(10px);
    animation: gradientShift 8s ease infinite;
  }

  .light-gradient {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(240, 240, 240, 0.9) 100%
    );
    backdrop-filter: blur(10px);
    animation: gradientShift 8s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Position variations */
  .position-bottom-right { bottom: 1rem; right: 1rem; }
  .position-bottom-left { bottom: 1rem; left: 1rem; }
  .position-top-right { top: 1rem; right: 1rem; }
  .position-top-left { top: 1rem; left: 1rem; }

  /* Progress Circle */
  svg circle {
    transition: stroke-dasharray 0.3s ease;
  }

  /* Theme-specific text colors */
  .dark-gradient {
    color: var(--text);
  }

  .light-gradient {
    color: var(--text-dark, #1f2937);
  }

  /* Animations */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Glass effect */
  .widget-container {
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .widget-container:hover {
    box-shadow: 
      0 8px 12px -1px rgba(0, 0, 0, 0.2),
      0 4px 8px -1px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  /* Add other necessary styles... */
`
shadowRoot.appendChild(style)

// Create container for React
const container = document.createElement('div')
shadowRoot.appendChild(container)

// Load saved preferences
chrome.storage.sync.get({
  theme: 'dark',
  position: 'bottom-right',
  wpm: 200,
  showSection: true,
  showProgress: true
}, (preferences) => {
  // Render React component with preferences
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <SettingsProvider initialSettings={preferences}>
        <Widget />
      </SettingsProvider>
    </StrictMode>
  )
})