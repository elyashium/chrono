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

  /* Position variations */
  .position-bottom-right { bottom: 1rem; right: 1rem; }
  .position-bottom-left { bottom: 1rem; left: 1rem; }
  .position-top-right { top: 1rem; right: 1rem; }
  .position-top-left { top: 1rem; left: 1rem; }

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