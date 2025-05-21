import { useState, useEffect, useRef } from 'react'

interface TypewriterProps {
    prefix?: string
    words: string[]
    speed?: number
    eraseSpeed?: number
    delayBetweenWords?: number
}

const Typewriter = ({ prefix = '', words, speed = 200, eraseSpeed = 100, delayBetweenWords = 1500 }: TypewriterProps) => {
    // State for currently displayed word
    const [currentWord, setCurrentWord] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    // Reference for word index
    const wordIndex = useRef(0)

    // Typing effect
    useEffect(() => {
        if (!isTyping) return

        const targetWord = words[wordIndex.current]

        if (currentWord === targetWord) {
            // Word complete, wait and then erase
            const timeout = setTimeout(() => {
                setIsTyping(false)
            }, delayBetweenWords)

            return () => clearTimeout(timeout)
        }

        // Continue typing
        const timeout = setTimeout(() => {
            setCurrentWord(targetWord.substring(0, currentWord.length + 1))
        }, speed)

        return () => clearTimeout(timeout)
    }, [currentWord, isTyping, speed, delayBetweenWords, words])

    // Erasing effect
    useEffect(() => {
        if (isTyping || currentWord === '') return

        const timeout = setTimeout(() => {
            setCurrentWord((prev) => prev.substring(0, prev.length - 1))

            if (currentWord.length === 1) {
                // Word fully erased, move to next word and start typing again
                wordIndex.current = (wordIndex.current + 1) % words.length
                setIsTyping(true)
            }
        }, eraseSpeed)

        return () => clearTimeout(timeout)
    }, [currentWord, isTyping, eraseSpeed, words.length])

    return (
        <span className='ml-4 inline-flex items-baseline text-4xl lowercase font-light space-x-2'>
            {prefix && <span>{prefix}</span>}
            {currentWord}
            <span className='animate-blink'>|</span>
        </span>
    )
}

export default Typewriter
