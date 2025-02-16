import '../index.css' 

import { createRoot } from 'react-dom/client'
import Widget from '../components/Widget'
import { StrictMode } from 'react'


const widgetroot = document.createElement('div')
document.body.appendChild(widgetRoot);
//adds the created div at the end of the <body>
const ShadowRoot = widgetRoot.attachShadow({ mode: 'open' })
//creates a shadow root for the div and sets the mode to open
//the shadow root is a hidden root that can be used to attach elements to the DOM
const ReactRoot = createRoot(ShadowRoot);
ReactRoot.render(
    <StrictMode>
        <Widget />
    </StrictMode>
)
//This tells React to render the Widget component inside the Shadow DOM.

