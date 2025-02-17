import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'

export default function Widget({ wpm = 200 }) {
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
        const rawTime = totalWords / wpm;
        return Math.max(1, Math.ceil(rawTime * (1 - scrollProgress)));
    }, [totalWords, scrollProgress, wpm]);

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
            fixed bottom-4 right-4 
            backdrop-blur-md bg-black/40 
            p-4 rounded-xl shadow-lg 
            border border-white/10 
            font-sans min-w-[200px]
            transition-all duration-300 ease-in-out
            hover:bg-black/50 
            ${isAnimating ? 'scale-105' : 'scale-100'}
        `}>
            <div className="space-y-3">
                {/* Progress Circle */}
                <div className="flex items-center justify-between">
                    <div className="relative w-12 h-12">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <circle 
                                cx="18" cy="18" r="16" 
                                className="fill-none stroke-gray-700/30" 
                                strokeWidth="3" 
                            />
                            <circle 
                                cx="18" cy="18" r="16" 
                                className="fill-none stroke-amber-400" 
                                strokeWidth="3"
                                strokeDasharray={`${scrollProgress * 100} 100`}
                                transform="rotate(-90 18 18)"
                            />
                            <text 
                                x="18" y="18" 
                                dy=".35em"
                                className="fill-white text-xs font-medium text-center"
                                textAnchor="middle"
                            >
                                {Math.round(scrollProgress * 100)}%
                            </text>
                        </svg>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-amber-400">⏳</span>
                        <span className="font-medium text-white text-lg">
                            {Math.max(0, Math.floor(timeLeft))}m
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-1.5 border-t border-white/10 pt-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Words</span>
                        <span className="text-gray-300">{totalWords.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Finish by</span>
                        <span className="text-gray-300">
                            {new Date(Date.now() + timeLeft * 60000).toLocaleTimeString([], { 
                                hour: 'numeric', 
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    {currentSection && (
                        <div className="text-sm text-gray-400 truncate">
                            <span className="text-amber-400/80">📍</span> {currentSection}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
