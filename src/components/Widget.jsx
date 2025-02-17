import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'


export default function Widget() {

    const [timeLeft, setTimeLeft] = useState(0);
    const [totalWords, setTotalWords] = useState(0);


    useEffect(() => {
        // Function to get visible text from the page
        const getVisibleText = () => {
            const bodyText = document.body.innerText || "";
            // Filter out common UI elements text
            return bodyText.split('\n')
                .filter(line => 
                    !line.match(/^(Menu|Search|Home|About|Contact|©|Privacy Policy|Terms)$/i)
                )
                .join(' ');
        };

        // Calculate total words
        const text = getVisibleText();
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        setTotalWords(wordCount);

        // Calculate reading time (assuming 200 words per minute)
        const estimatedMinutes = wordCount / 200;
        setTimeLeft(estimatedMinutes);
    }, []);

    // Update time based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / height, 1);
            
            // Adjust remaining time based on scroll progress
            const remainingTime = timeLeft * (1 - progress);
            setTimeLeft(remainingTime);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [timeLeft]);

    //dynamic time calculation 



    const BASE_WP = 200;
    // average reading time in english
    const scrollProgress = useScrollProgress();
    //returns a value from 0 to 1 to indicate the page length scrolled.
    // 0 means at the top.
    // 0.5 means half the page has been scrolled etc..


    const estimatedTime = useMemo(() => {
        const rawTime = totalWords / BASE_WP
        return Math.max(1, Math.ceil(rawTime * (1 - scrollProgress)))
        //Math.max(1, ...): Ensures that at least 1 minute is displayed, even if the estimated time is very low.


    }, [totalWords, scrollProgress])
    //estimatedTime is recalculated only when totalWords or scrollProgress changes.


    useEffect(() => {
       
        const timer = setInterval(() => {
            setTimeLeft(prev =>
                Math.max(estimatedTime, prev - 0.0167)
            );
        }, 1000 / 60); // 60 FPS (smooth animation)

        // Cleanup function: Clears the interval when `estimatedTime` changes or component unmounts
        return () => clearInterval(timer);
    }, [estimatedTime]); // Runs whenever `estimatedTime` changes



    return (
        <div className="fixed bottom-4 right-4 backdrop-blur-md bg-black/40 text-white p-4 rounded-xl shadow-lg border border-white/10 font-sans transition-all hover:bg-black/50">
            <div className="flex items-center gap-2">
                <span className="text-amber-400">⏳</span>
                <span className="font-medium">{Math.max(0, timeLeft).toFixed(1)}m</span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-300">{totalWords} words</span>
            </div>
        </div>
    )
}
