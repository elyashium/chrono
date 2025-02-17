import { createRoot } from 'react-dom/client'
import Widget from '../components/Widget'
import { StrictMode } from 'react'

// Create container for widget
const widgetRoot = document.createElement('div')
widgetRoot.id = 'chrono-widget-root'
document.body.appendChild(widgetRoot)

// Create shadow root for style isolation
const shadowRoot = widgetRoot.attachShadow({ mode: 'open' })

// custom styles for shadow DOM because of style isolation that happens when you use shadow root 
// it does not allow the global styles to be applied to the shadow DOM
const style = document.createElement('style')
style.textContent = `
  .fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: system-ui, -apple-system, sans-serif;
    transition: all 0.3s ease-in-out;
  }
  .fixed:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transform: scale(1.02);
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`
shadowRoot.appendChild(style)

// Create container for React
const container = document.createElement('div')
shadowRoot.appendChild(container)

// Render React component
const root = createRoot(container)
root.render(
  <StrictMode>
    <Widget />
  </StrictMode>
)