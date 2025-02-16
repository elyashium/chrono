import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'


export default function Widget() {

    const [timeLeft, setTimeLeft] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    // will add logic here 

    useEffect(() => {
        const visibleText = () => {
            //document.createTreeWalker is a built-in browser API
            // that creates a TreeWalker object, which allows you to traverse the DOM tree

            //its preffered over HTML.innerText and querySelector because the traversal is easy and 
            // in this case we need only visible text on the web page.
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


            let visibleText = '';

            while (walker.nextNode()) {
                const node = walker.currentNode;
                const parentElement = node.parentElement;

                //This loop iterates through all text nodes in the DOM, starting from the root (document.body).

                // Check if the element is visible
                if (parentElement && isElementVisible(parentElement)) {
                    visibleText += node.textContent + ' ';
                }

                // If the parent element is visible, append the text to the visibleText string, followed by a space (to separate words).
            }

            return visibleText.trim();
        };

        const isElementVisible = (element) => {
            const style = window.getComputedStyle(element);
            return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                element.offsetWidth > 0 &&
                element.offsetHeight > 0
            );
        };

        const words = visibleText().split(/\s+/);
        setTotalWords(words.length)

    }, []);

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

        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg shadow-lg">
            ⏳ {timeLeft}m remaining | Words: {totalWords}
        </div>

    )
}
