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
style.textContent =  `.fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: sans-serif;
    transition: all 0.2s;
  }
  .fixed:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .text-amber-400 {
    color: #fbbf24;
  }
  .font-medium {
    font-weight: 500;
  }
  .text-gray-400 {
    color: #9ca3af;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .text-gray-300 {
    color: #d1d5db;
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