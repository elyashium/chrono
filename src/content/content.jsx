import '../index.css'
import { createRoot } from 'react-dom/client'
import Widget from '../components/Widget'
import { StrictMode } from 'react'

// Create container for widget
const widgetRoot = document.createElement('div')
document.body.appendChild(widgetRoot)

// Create shadow root
const shadowRoot = widgetRoot.attachShadow({ mode: 'open' })

// Create container for React inside shadow root
const container = document.createElement('div')
shadowRoot.appendChild(container)

// Render React component
const root = createRoot(container)
root.render(
    <StrictMode>
        <Widget />
    </StrictMode>
) 