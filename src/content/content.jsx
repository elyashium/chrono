import '../index.css'
import { createRoot } from 'react-dom/client'
import Widget from '../components/Widget'
import { StrictMode } from 'react'

// Create container for widget
const widgetRoot = document.createElement('div')
widgetRoot.id = 'chrono-widget-root'
document.body.appendChild(widgetRoot)

// Create shadow root for style isolation
const shadowRoot = widgetRoot.attachShadow({ mode: 'open' })

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