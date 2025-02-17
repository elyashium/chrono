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
      fixed ${settings.position === 'top-right' ? 'top-4 right-4' : 
             settings.position === 'top-left' ? 'top-4 left-4' :
             settings.position === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4'}
      w-48 p-3.5 rounded-2xl
      font-sans
      backdrop-blur-md
      shadow-lg
      transition-all duration-300 ease-out
      ${isDark ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90' : 'bg-gradient-to-br from-white/90 to-gray-50/90'}
      before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r
      ${isDark ? 'before:from-blue-500/10 before:to-purple-500/10' : 'before:from-blue-200/20 before:to-purple-200/20'}
      before:animate-gradient-shift before:-z-10
    `}>
      <div className="space-y-2.5">
        {/* Progress Circle */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <svg className="w-full h-full -rotate-90">
              <circle
                className={`${isDark ? 'stroke-gray-700' : 'stroke-gray-200'}`}
                strokeWidth="2"
                fill="none"
                r="15"
                cx="16"
                cy="16"
              />
              <circle
                className={`${isDark ? 'stroke-blue-400' : 'stroke-blue-500'} transition-all duration-300 ease-out`}
                strokeWidth="2"
                fill="none"
                r="15"
                cx="16"
                cy="16"
                strokeDasharray={`${2 * Math.PI * 15}`}
                strokeDashoffset={`${2 * Math.PI * 15 * (1 - scrollProgress)}`}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-xs font-medium
              ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <AnimatedValue 
            value={Math.max(0, Math.floor(timeLeft))}
            unit="min"
          />
        </div>

        {/* Stats */}
        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} space-y-1`}>
          <div className="flex justify-between">
            <span>Total Words</span>
            <span className="font-medium">{totalWords.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Finish by</span>
            <span className="font-medium">
              {new Date(Date.now() + timeLeft * 60000).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Current Section */}
        {settings.showSection && currentSection && (
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate mt-2 pt-2 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
            <span className="text-xs mr-1.5">📍</span>
            <span className="truncate">{currentSection}</span>
          </div>
        )}
      </div>
    </div>
  );
}