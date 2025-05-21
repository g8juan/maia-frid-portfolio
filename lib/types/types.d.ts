// Define a type for the dropdown keys
export type DropdownKey = 'archive' | 'fashionDreaming' | 'workMethod' | 'academia' | 'press' | 'blog'

// Type for dropdown items with titles and subtitles
export interface DropdownItem {
    id: DropdownKey
    title: string
    subtitle: string
}

// Type for step data
export interface DetailSection {
    title: string
    text: string
}

export interface StepData {
    id: number
    title: string
    description: string
    image: string
    details?: DetailSection[]
}
