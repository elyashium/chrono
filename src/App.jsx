import React from 'react'
import { Settings } from './components/Settings'
import { SettingsProvider } from './contexts/SettingsContext'
import { ErrorBoundary } from 'react-error-boundary'

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <SettingsProvider initialSettings={{
        theme: 'dark',
        position: 'bottom-right',
        wpm: 200,
        showSection: true,
        showProgress: true
      }}>
        <div className="p-6 w-80 space-y-6 font-sans">
          <Settings />
        </div>
      </SettingsProvider>
    </ErrorBoundary>
  )
}

