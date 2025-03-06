import React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { SettingsProvider } from '../contexts/SettingsContext'
import Widget from '../components/Widget'
import styles from '../index.css?inline'

const hostElement = document.createElement('div')
hostElement.id = 'chrono-extension-root'
hostElement.style.cssText = `
  position: fixed;
  z-index: 2147483647;
  pointer-events: none;
  width: 100%;
  height: 100%;
`
document.documentElement.appendChild(hostElement)

const shadowRoot = hostElement.attachShadow({ mode: 'open' })

const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
fontLink.rel = 'stylesheet'
shadowRoot.appendChild(fontLink)

const style = document.createElement('style')
style.textContent = `
  :host {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  /* Base styles for widget container */
  .widget-container {
    display: block;
    pointer-events: auto;
  }
  
  /* Ensure text colors are visible */
  .text-secondary {
    color: rgba(255, 255, 255, 0.7);
  }
  
  /* Add padding to widget */
  .fixed {
    padding: 16px;
    border-radius: 12px;
    margin: 16px;
  }
  
  ${styles}
`
shadowRoot.appendChild(style)

const container = document.createElement('div')
container.className = 'widget-container'
shadowRoot.appendChild(container)

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
