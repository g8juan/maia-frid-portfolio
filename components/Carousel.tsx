import { useState, useEffect, useRef } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'

interface CarouselProps {
    children: ReactNode[]
    autoPlay?: boolean
    autoPlayInterval?: number
    showArrows?: boolean
    className?: string
    itemsPerView?: number
    gap?: number // Gap in pixels between items
    label?: string // Accessible label for the carousel
}

const Carousel = ({ 
    children, 
    autoPlay = false, 
    autoPlayInterval = 5000, 
    showArrows = true, 
    className = '',
    itemsPerView = 3,
    gap = 16, // Default 16px gap
    label = 'Image carousel'
}: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)
    const totalItems = children.length
    
    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const nextIndex = prev + itemsPerView
            // Loop back to the beginning if we reach the end
            return nextIndex >= totalItems ? 0 : nextIndex
        })
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const nextIndex = prev - itemsPerView
            // Loop back to the end if we're at the beginning
            return nextIndex < 0 ? Math.max(0, totalItems - (totalItems % itemsPerView || itemsPerView)) : nextIndex
        })
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case 'ArrowLeft':
                prevSlide()
                e.preventDefault()
                break
            case 'ArrowRight':
                nextSlide()
                e.preventDefault()
                break
            case 'Home':
                setCurrentIndex(0)
                e.preventDefault()
                break
            case 'End':
                setCurrentIndex(Math.max(0, totalItems - itemsPerView))
                e.preventDefault()
                break
            default:
                break
        }
    }

    useEffect(() => {
        if (!autoPlay || isPaused) return

        const interval = setInterval(() => {
            nextSlide()
        }, autoPlayInterval)

        return () => clearInterval(interval)
    }, [autoPlay, autoPlayInterval, currentIndex, isPaused])

    // Calculate slide information for announcements
    const slideInfo = `Item ${currentIndex + 1} of ${totalItems}`
    
    // Display percentage based on items per view
    const itemWidth = 100 / itemsPerView

    return (
        <div 
            className={`w-full relative overflow-hidden ${className}`}
            ref={carouselRef}
            role="region"
            aria-label={label}
            aria-roledescription="carousel"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Visually hidden live region for screen readers */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {slideInfo}
            </div>
            
            <div
                className='flex transition-transform duration-500 ease-in-out h-full'
                style={{ 
                    transform: `translateX(-${currentIndex * itemWidth}%)`,
                    gap: `${gap}px` 
                }}
                aria-hidden="true" // The visual content is described elsewhere
            >
                {children.map((child, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 h-full"
                        style={{ 
                            width: `calc(${itemWidth}% - ${gap * (itemsPerView - 1) / itemsPerView}px)` 
                        }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${totalItems}`}
                        aria-hidden={index < currentIndex || index >= currentIndex + itemsPerView}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-colors'
                        onClick={prevSlide}
                        aria-label='Previous slide'
                        type="button"
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-6 h-6'
                            aria-hidden="true"
                        >
                            <path
                                fillRule='evenodd'
                                d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                    <button
                        className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full z-10 transition-colors'
                        onClick={nextSlide}
                        aria-label='Next slide'
                        type="button"
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-6 h-6'
                            aria-hidden="true"
                        >
                            <path
                                fillRule='evenodd'
                                d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </>
            )}
        </div>
    )
}

export default Carousel
