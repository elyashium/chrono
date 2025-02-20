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

// Inject styles
const style = document.createElement('style')
style.textContent = `
  :host {
    all: initial; /* Reset inherited styles */
    display: block;
    position: fixed;
    z-index: 9999;
    contain: content;
  }

  .widget-container {
    position: fixed !important;
    z-index: 9999 !important;
  }

  /* Add this new rule for SVG alignment */
  svg {
    transform-box: fill-box;
    overflow: visible;
  }

  /* Base styles */
  .widget-container {
    position: fixed;
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
  }

  /* Positioning */
  .position-bottom-right { bottom: 1rem; right: 1rem; }
  .position-bottom-left { bottom: 1rem; left: 1rem; }
  .position-top-right { top: 1rem; right: 1rem; }
  .position-top-left { top: 1rem; left: 1rem; }

  /* Spacing utilities */
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .space-y-2\.5 > * + * { margin-top: 0.625rem; }
  .gap-2 > * + * { margin-left: 0.5rem; }
  .p-3\.5 { padding: 0.875rem; }
  .mt-2 { margin-top: 0.5rem; }
  .pt-2 { padding-top: 0.5rem; }
  .ml-1 { margin-left: 0.25rem; }
  .mr-1\.5 { margin-right: 0.375rem; }

  /* Typography */
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .font-medium { font-weight: 500; }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Layout */
  .flex { display: flex; }
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .w-48 { width: 12rem; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }

  /* Borders & Rounded Corners */
  .rounded-2xl { border-radius: 1rem; }
  .border-t { border-top-width: 1px; }

  /* Backgrounds & Effects */
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  /* Gradient animations */
  @keyframes gradient-shift {
    0% { transform: translateX(-50%) translateY(-50%); }
    50% { transform: translateX(50%) translateY(50%); }
    100% { transform: translateX(-50%) translateY(-50%); }
  }

  .animate-gradient-shift {
    animation: gradient-shift 8s ease-in-out infinite;
  }

  /* Theme-specific styles */
  .from-gray-900\/90 { background-image: linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), transparent); }
  .to-gray-800\/90 { background-image: linear-gradient(to bottom right, transparent, rgba(31, 41, 55, 0.9)); }
  .from-white\/90 { background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), transparent); }
  .to-gray-50\/90 { background-image: linear-gradient(to bottom right, transparent, rgba(249, 250, 251, 0.9)); }

  /* SVG styles */
  .-rotate-90 { transform: rotate(-90deg); }

  /* Transitions */
  .transition-all { transition-property: all; }
  .duration-300 { transition-duration: 300ms; }
  .ease-out { transition-timing-function: cubic-bezier(0.0, 0, 0.2, 1); }

  /* Text colors */
  .text-gray-200 { color: rgb(229, 231, 235); }
  .text-gray-400 { color: rgb(156, 163, 175); }
  .text-gray-500 { color: rgb(107, 114, 128); }
  .text-gray-600 { color: rgb(75, 85, 99); }

  /* Border colors */
  .border-gray-700\/50 { border-color: rgba(55, 65, 81, 0.5); }
  .border-gray-200\/50 { border-color: rgba(229, 231, 235, 0.5); }

  /* Stroke colors */
  .stroke-gray-700 { stroke: rgb(55, 65, 81); }
  .stroke-gray-200 { stroke: rgb(229, 231, 235); }
  .stroke-blue-400 { stroke: rgb(96, 165, 250); }
  .stroke-blue-500 { stroke: rgb(59, 130, 246); }

  /* Opacity */
  .opacity-60 { opacity: 0.6; }
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
  try {
    const root = createRoot(container)
    root.render(
      <StrictMode>
        <SettingsProvider initialSettings={preferences}>
          <Widget />
        </SettingsProvider>
      </StrictMode>
    )
  } catch (error) {
    console.error('Failed to render Chrono widget:', error)
  }
})