import React, { useState } from 'react'
import Widget from './components/Widget'
import { Slider } from './components/Slider'

export default function App() {
  const [wpm, setWpm] = useState(200)

  return (
    <div className="p-6 w-80 space-y-6 font-sans">
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-gray-800">Chrono</h1>
        <p className="text-sm font-medium text-amber-600">Reading Time Estimator</p>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <p>
          Chrono estimates reading time based on your scroll position and reading speed.
          The average adult reads between 200-250 words per minute for general content.
        </p>
        
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center">
            <label htmlFor="wpm" className="font-medium text-gray-700">
              Reading Speed
            </label>
            <span className="text-amber-600 font-medium">
              {wpm} WPM
            </span>
          </div>
          
          <Slider
            id="wpm"
            min={100}
            max={400}
            step={10}
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Careful Reader</span>
            <span>Speed Reader</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-medium text-gray-700">How it works</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Analyzes main content, excluding navigation and footers</li>
            <li>Updates estimate based on your scroll position</li>
            <li>Adjusts to your preferred reading speed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

