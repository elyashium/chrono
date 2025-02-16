import React from 'react'
import { useState, useEffect } from 'react'


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

        const words = VisibleText().split(/\s+/);
        setTotalWords(words.length)

    }, []);

    //dynamic time calculation 



    const BASE_WP = 200;
    // average reading time in english



    return (

        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg shadow-lg">
            ⏳ {timeLeft}m remaining | Words: {totalWords}
        </div>

    )
}
