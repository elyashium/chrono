import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'
import { useSettings } from '../contexts/SettingsContext'

export default function Widget() {
    const { settings } = useSettings();
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalWords, setTotalWords] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentSection, setCurrentSection] = useState('');
    const scrollProgress = useScrollProgress();

    // Track current section based on headings
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

    // Calculate total words only once when component mounts
    useEffect(() => {
        const getVisibleText = () => {
            // Try to find main content first
            const contentSelectors = [
                // AI Chat selectors
                '[data-message-author-role="assistant"]',
                '.claude-message',
                '.ai-message',
                '.message-content',
                '[data-testid="conversation-turn-2"]',
                // Standard content selectors
                'article',
                '[role="main"]',
                '.main-content',
                '#main-content',
                '.post-content',
                '.article-content',
                '.entry-content',
                'main'
            ];

            let mainContent = null;
            let combinedText = '';

            // Try to find all matching elements
            for (const selector of contentSelectors) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    elements.forEach(element => {
                        combinedText += ' ' + element.innerText;
                    });
                }
            }

            // If no content found, fallback to body
            return combinedText || document.body.innerText;
        };

        const text = getVisibleText();
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        setTotalWords(words.length);
    }, []);

    // Calculate estimated time based on scroll progress
    const estimatedTime = useMemo(() => {
        const rawTime = totalWords / settings.wpm;
        return Math.max(1, Math.ceil(rawTime * (1 - scrollProgress)));
    }, [totalWords, scrollProgress, settings.wpm]);

    // Smooth transition when minute changes
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

    return (
        <div className={`
            widget-container
            position-${settings.position}
            p-4 rounded-lg
            font-sans min-w-[200px]
            ${settings.theme === 'dark' ? 'dark-gradient' : 'light-gradient'}
        `}>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className={`text-base ${settings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {Math.round(scrollProgress * 100)}%
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-amber-400">⏳</span>
                    <span className={`text-base ${settings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {Math.max(0, Math.floor(timeLeft))}m
                    </span>
                </div>

                <div className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Words {totalWords.toLocaleString()}
                </div>

                <div className={`text-sm ${settings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Finish by {new Date(Date.now() + timeLeft * 60000).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                    })}
                </div>

                {settings.showSection && currentSection && (
                    <div className={`text-sm ${settings.theme === 'dark' ? 'text-white/80' : 'text-gray-600'} truncate`}>
                        <span className="text-amber-400">📍</span> {currentSection}
                    </div>
                )}
            </div>
        </div>
    )
}
