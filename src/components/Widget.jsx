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
            for (const selector of contentSelectors) {
                const element = document.querySelector(selector);
                if (element) {
                    mainContent = element;
                    break;
                }
            }

            // If no main content found, fallback to body
            const textContent = mainContent ? mainContent.innerText : document.body.innerText;

            // Split into lines and filter out common UI elements
            return textContent.split('\n')
                .filter(line => {
                    const lowercaseLine = line.toLowerCase().trim();
                    
                    // Common UI elements to exclude
                    const excludePatterns = [
                        /^menu$/,
                        /^search$/,
                        /^home$/,
                        /^about$/,
                        /^contact$/,
                        /^©/,
                        /^privacy policy$/,
                        /^terms$/,
                        /^share$/,
                        /^follow$/,
                        /^subscribe$/,
                        /^related articles$/,
                        /^comments$/,
                        /^\d+ (min|minutes) read$/,
                        /^published/i,
                        /^updated/i,
                        /^loading/i,
                        /^advertisement$/i
                    ];

                    return !excludePatterns.some(pattern => pattern.test(lowercaseLine));
                })
                .join(' ');
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
