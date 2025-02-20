import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { SettingsProvider } from '../contexts/SettingsContext'
import Widget from '../components/Widget'
import '../index.css'

// Add CSS import
import styles from '../index.css?inline'

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

// Inject CSS directly
const style = document.createElement('style')
style.textContent = styles
shadowRoot.appendChild(style)

// Add font family fallbacks
style.textContent += `
  :host {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  @supports not (font-variation-settings: normal) {
    :host {
      font-family: system-ui, -apple-system, sans-serif;
    }
  }
`

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