import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { SettingsProvider } from '../contexts/SettingsContext'
import Widget from '../components/Widget'
import '../index.css'

// Create shadow DOM with proper positioning
const hostElement = document.createElement('div')
hostElement.id = 'chrono-extension-root'
hostElement.style.cssText = `
  position: fixed;
  z-index: 2147483647;
  padding: 24px;
  pointer-events: none;
  width: 100%;
  height: 100%;
`
document.documentElement.appendChild(hostElement) // Attach to html instead of body

const shadowRoot = hostElement.attachShadow({ mode: 'open' })

// Add Google Fonts
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
fontLink.rel = 'stylesheet'
shadowRoot.appendChild(fontLink)

// Add styles with proper resets and spacing
const style = document.createElement('style')
style.textContent = `
  :host {
    all: initial;
    display: block;
    position: fixed;
    z-index: 2147483647;
    font-family: 'Inter', sans-serif;
    --widget-spacing: 24px;
  }

  .widget-container {
    position: fixed !important;
    z-index: 2147483647 !important;
    pointer-events: auto;
  }

  /* Premium dark theme with proper spacing */
  .dark-theme {
    background: rgba(23, 23, 23, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    padding: var(--widget-spacing);
  }

  /* Circle progress specific styles */
  .progress-circle {
    width: 36px;
    height: 36px;
    position: relative;
  }

  .progress-circle svg {
    transform: rotate(-90deg);
    overflow: visible;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  .progress-circle circle {
    transition: stroke-dashoffset 0.3s ease;
  }

  /* Refined typography */
  .text-premium {
    color: rgba(255, 255, 255, 0.95);
    font-feature-settings: 'ss01', 'ss02', 'cv01';
    letter-spacing: -0.02em;
  }

  .text-secondary {
    color: rgba(255, 255, 255, 0.6);
  }

  /* Smooth transitions */
  .transition-premium {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Base styles */
  .font-sans { font-family: 'Inter', sans-serif; }
  .space-y-3 > * + * { margin-top: 0.75rem; }
  .gap-3 > * + * { margin-left: 0.75rem; }
  .rounded-2xl { border-radius: 1rem; }
  
  /* Include other necessary styles */
  

  /* Layout utilities */
  .flex { display: flex; }
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
  .space-y-3 > * + * { margin-top: 0.75rem; }
  .gap-3 > * + * { margin-left: 0.75rem; }
  
  /* Typography */
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .font-medium { font-weight: 500; }
  
  /* Position */
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  
  /* Border */
  .border-t { border-top-width: 1px; }
  .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
  
  /* Truncate */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Tailwind utilities from index.css */
  @keyframes gradient-shift {
    0% { transform: translateX(-50%) translateY(-50%); }
    50% { transform: translateX(50%) translateY(50%); }
    100% { transform: translateX(-50%) translateY(-50%); }
  }
  
  .animate-gradient-shift {
    animation: gradient-shift 8s ease-in-out infinite;
  }
  
  /* Position utilities */
  .position-top-right { top: 1rem; right: 1rem; }
  .position-top-left { top: 1rem; left: 1rem; }
  .position-bottom-right { bottom: 1rem; right: 1rem; }
  .position-bottom-left { bottom: 1rem; left: 1rem; }

  /* Add other necessary Tailwind utilities */
  .w-48 { width: 12rem; }
  .rounded-2xl { border-radius: 1rem; }
  .backdrop-blur-md { backdrop-filter: blur(12px); }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
`
shadowRoot.appendChild(style)

// Create container with proper pointer events
const container = document.createElement('div')
container.className = 'widget-container'
shadowRoot.appendChild(container)

// Load saved preferences and render with error handling
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