import { useRef } from 'react'
import type { KeyboardEvent } from 'react'

interface CustomDropdownProps {
    id: string
    title: string
    subtitle: string
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
    children: React.ReactNode
}

const CustomDropdown = ({ id, title, subtitle, isOpen, onOpen, onClose, onToggle, children }: CustomDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
            case 'Enter':
            case ' ': // Space
                e.preventDefault() // Prevent scroll with space
                onToggle()
                break
            case 'Escape':
                onClose()
                break
            case 'Tab':
                // Default Tab behavior is suitable
                break
            default:
                break
        }
    }

    return (
        <div
            ref={dropdownRef}
            onMouseLeave={onClose}
            className='border-b border-gray-200 pb-4 w-full'
        >
            <button
                className='w-full flex items-center'
                onMouseEnter={onOpen}
                // onClick={onToggle}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
            >
                <span className={`text-[5.5rem] leading-none tracking-wider font-light text-with-cursor ${isOpen ? 'active-cursor' : ''}`}>{title}</span>
            </button>

            {/* Dropdown Content */}
            <div
                id={`${id}-content`}
                className={`overflow-hidden transition-all duration-500 ease-in-out delay-100 ${isOpen ? 'max-h-max opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                aria-hidden={!isOpen}
            >
                <h3 className='font-serif uppercase text-gray-700 text-xl mb-4'>{subtitle}</h3>
                {children}
            </div>
        </div>
    )
}

export default CustomDropdown
