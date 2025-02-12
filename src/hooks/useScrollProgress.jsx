const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = throttle(() => {
            const scrolled = window.scrollY + window.innerHeight
            setScrollProgress(scrolled / document.documentElement.scrollHeight)
        }, 200)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollProgress
}