import { useState, useEffect } from 'react'

// Simple throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

export default function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrolled = window.scrollY + window.innerHeight
            //window.scrollY: The number of pixels the page has been scrolled vertically.
            //window.innerHeight: The height of the viewport (visible part of the page).
            setScrollProgress(scrolled / document.documentElement.scrollHeight)
        }, 200)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollProgress
}
