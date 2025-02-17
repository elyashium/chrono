import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'

export default function Widget({ wpm = 200 }) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalWords, setTotalWords] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const scrollProgress = useScrollProgress();

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
            font-sans 
            transition-all duration-300 ease-in-out
            hover:bg-black/50 
            ${isAnimating ? 'scale-105' : 'scale-100'}
        `}>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-amber-400 animate-pulse">⏳</span>
                    <span className="font-medium text-white text-lg tracking-tight">
                        {Math.max(0, Math.floor(timeLeft))}m
                    </span>
                </div>
                <div className="h-4 w-px bg-gray-500/50" />
                <span className="text-sm text-gray-300">
                    {totalWords.toLocaleString()} words
                </span>
            </div>
        </div>
    )
}
