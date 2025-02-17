import React from 'react'
import { useSettings } from '../contexts/SettingsContext'

export function Settings() {
  const { settings, updateSettings } = useSettings()

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Theme
        </label>
        <select
          value={settings.theme}
          onChange={(e) => updateSettings({ theme: e.target.value })}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <select
          value={settings.position}
          onChange={(e) => updateSettings({ position: e.target.value })}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Reading Speed (WPM)
        </label>
        <input
          type="number"
          value={settings.wpm}
          onChange={(e) => updateSettings({ wpm: Number(e.target.value) })}
          min={100}
          max={1000}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showSection}
            onChange={(e) => updateSettings({ showSection: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Show Current Section</span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.showProgress}
            onChange={(e) => updateSettings({ showProgress: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Show Progress Circle</span>
        </label>
      </div>
    </div>
  )
}