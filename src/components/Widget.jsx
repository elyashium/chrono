import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useScrollProgress from '../hooks/useScrollProgress';
import { useSettings } from '../contexts/SettingsContext';

const AnimatedValue = ({ value, unit }) => (
  <span className="inline-flex items-center transition-all duration-300 ease-out">
    <span className="font-medium">{value}</span>
    <span className="text-xs ml-1 opacity-60">{unit}</span>
  </span>
);

export default function Widget() {
  const { settings } = useSettings();
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const scrollProgress = useScrollProgress();

  // Previous effects remain the same...
  useEffect(() => {
    const trackCurrentSection = () => {
      const headings = document.querySelectorAll('h1, h2, h3');
      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        if (rect.top > 0 && rect.top < window.innerHeight) {
          setCurrentSection(heading.innerText);
          break;
        }
      }
    };

    window.addEventListener('scroll', trackCurrentSection);
    return () => window.removeEventListener('scroll', trackCurrentSection);
  }, []);

  useEffect(() => {
    const getVisibleText = () => {
      const contentSelectors = [
        '[data-message-author-role="assistant"]',
        '.claude-message',
        '.ai-message',
        '.message-content',
        '[data-testid="conversation-turn-2"]',
        'article',
        '[role="main"]',
        '.main-content',
        '#main-content',
        '.post-content',
        '.article-content',
        '.entry-content',
        'main'
      ];

      let combinedText = '';
      for (const selector of contentSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(element => {
            combinedText += ' ' + element.innerText;
          });
        }
      }

      return combinedText || document.body.innerText;
    };

    const text = getVisibleText();
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setTotalWords(words.length);
  }, []);

  const estimatedTime = useMemo(() => {
    const rawTime = totalWords / settings.wpm;
    return Math.max(1, Math.ceil(rawTime * (1 - scrollProgress)));
  }, [totalWords, scrollProgress, settings.wpm]);

  useEffect(() => {
    if (Math.floor(timeLeft) !== estimatedTime) {
      setIsAnimating(true);
      setTimeLeft(estimatedTime);

      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [estimatedTime, timeLeft]);

  const isDark = settings.theme === 'dark';

  return (
    <div className={`
      fixed ${settings.position === 'top-right' ? 'top-0 right-0' : 
             settings.position === 'top-left' ? 'top-0 left-0' :
             settings.position === 'bottom-left' ? 'bottom-0 left-0' : 'bottom-0 right-0'}
      w-48
      font-sans
      dark-theme
      transition-premium
      text-premium
      backdrop-blur-md
      shadow-lg
      z-[2147483647]
    `}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle
                className="stroke-white/10"
                strokeWidth="3"
                fill="none"
                cx="18"
                cy="18"
                r="15"
              />
              <circle
                className="stroke-white/90"
                strokeWidth="3"
                fill="none"
                cx="18"
                cy="18"
                r="15"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15}`}
                strokeDashoffset={`${2 * Math.PI * 15 * (1 - scrollProgress)}`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <AnimatedValue 
            value={Math.max(0, Math.floor(timeLeft))}
            unit="min"
          />
        </div>

        {/* Stats section with proper spacing */}
        <div className="space-y-2 text-secondary">
          <div className="flex justify-between text-xs">
            <span>Total Words</span>
            <span className="font-medium">{totalWords.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Finish by</span>
            <span className="font-medium">
              {new Date(Date.now() + timeLeft * 60000).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Current Section with proper spacing */}
        {settings.showSection && currentSection && (
          <div className="text-xs text-secondary truncate pt-2 border-t border-white/10">
            <span className="mr-1.5">📍</span>
            <span className="truncate">{currentSection}</span>
          </div>
        )}
      </div>
    </div>
  );
}