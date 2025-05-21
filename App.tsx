import { useState, useEffect } from 'react'
import './App.scss'
import CustomDropdown from '@components/CustomDropdown'
import Typewriter from '@components/Typewriter'
import { dropdownItems } from '@lib/contants/custom-dropdowns-items'
import { iAmWords, interestsWords } from '@lib/contants/about-me-words'
import type { DropdownKey } from '@types/types'
import type { DropdownItem } from '@types/types'
import Carousel from '@components/Carousel'
import { workingTogetherSteps, globalAvailability } from '@lib/contants/working-together-steps'
import type { StepData } from '@lib/types/types'
import type { DetailSection } from './lib/types/types'

function App() {
    // State for tracking which dropdowns are open
    const [dropdownStates, setDropdownStates] = useState<Record<DropdownKey, boolean>>({
        archive: false,
        fashionDreaming: false,
        workMethod: false,
        academia: false,
        press: false,
        blog: false
    })

    // Function to open a specific dropdown
    const openDropdown = (key: DropdownKey) => {
        setDropdownStates((prev) => ({
            ...prev,
            [key]: true
        }))
    }

    // Function to close a specific dropdown
    const closeDropdown = (key: DropdownKey) => {
        setDropdownStates((prev) => ({
            ...prev,
            [key]: false
        }))
    }

    // Function to toggle a specific dropdown
    const toggleDropdown = (key: DropdownKey) => {
        setDropdownStates((prev) => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    // Function to close all dropdowns - useful for keyboard management
    const closeAllDropdowns = () => {
        setDropdownStates({
            archive: false,
            fashionDreaming: false,
            workMethod: false,
            academia: false,
            press: false,
            blog: false
        })
    }

    // Close dropdowns when clicking outside them
    useEffect(() => {
        function handleClickOutside() {
            // This is a simplified version since actual refs are now in the CustomDropdown
            // Just checking if any dropdowns are open
            if (Object.values(dropdownStates).some((isOpen) => isOpen)) {
                // If we're not clicking on any dropdown that's open, close all
                closeAllDropdowns()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownStates])

    return (
        <>
            <section className='relative max-w-dvw w-full h-dvh overflow-hidden flex items-end justify-center'>
                <div className='mx-56 mb-24 z-20 text-gray-100'>
                    <h1 className='font-serif tracking-wide font-light text-base/9 text-[1.75rem] text-justify mb-28'>I am a purpose-driven visual creator. I design experiences and visual narratives that merge aesthetics and sustainability, guided by a commitment to social, environmental, and cultural impact, with the goal of transforming our connection with fashion.</h1>
                    <div className='text-xl text-center leading-none text-with-cursor active-cursor'>more about me</div>
                </div>
                <video
                    className='absolute inset-0 w-full h-full object-cover z-0 aspect-video'
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload='auto'
                    aria-label='Artistic background video'
                >
                    {/* Mobile-specific video - loaded on screens up to 768px wide */}
                    <source
                        src='/videos/mf-hero-video-mobile.mp4'
                        type='video/mp4'
                        media='(max-width: 768px)'
                    />
                    {/* WebM version for wider screens - browsers that support WebM will pick this first */}
                    <source
                        src='/videos/mf-hero-video.webm'
                        type='video/webm'
                        media='(min-width: 769px)'
                    />
                    {/* MP4 version for wider screens - fallback if WebM is not supported or for browsers that prefer MP4 */}
                    <source
                        src='/videos/mf-hero-video.mp4'
                        type='video/mp4'
                        media='(min-width: 769px)'
                    />
                    Your browser does not support the video tag.
                </video>
                <div
                    className='absolute inset-0 opacity-50 bg-black z-10'
                    aria-hidden='true'
                />
            </section>

            {/* Dropdowns Section */}
            <section
                className='relative max-w-dvw w-full min-h-dvh py-24 bg-white'
                aria-label='Main categories'
            >
                <div className='top-18 italic text-gray-700 text-continous-translate h-min mb-24'>
                    <span>"My connection with nature shares the same space as the one I nurture with others and myself, guided by deep listening and collective creation."</span>
                </div>
                <div className='w-full px-36 space-y-6 flex flex-col items-start justify-center'>
                    {dropdownItems.map((item: DropdownItem) => (
                        <CustomDropdown
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            isOpen={dropdownStates[item.id as DropdownKey] ?? false}
                            onOpen={() => openDropdown(item.id as DropdownKey)}
                            onClose={() => closeDropdown(item.id as DropdownKey)}
                            onToggle={() => toggleDropdown(item.id as DropdownKey)}
                        >
                            {item.title === 'blog' ? (
                                <div className="py-6">
                                    <Carousel
                                        autoPlay={false}
                                        autoPlayInterval={5000}
                                        showArrows={false}
                                        className="h-[400px]"
                                        itemsPerView={3}
                                        gap={16}
                                        label="Blog articles"
                                    >
                                        {/* Blog Article 1 */}
                                        <div className="bg-white overflow-hidden h-full border border-gray-200 overflow-y-scroll">
                                            <div className="h-1/2 overflow-hidden">
                                                <img 
                                                    src="/images/mwm-step-1.png" 
                                                    alt="Sustainable Fashion Practices" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <p className="text-sm text-gray-500 mb-2">June 15, 2023</p>
                                                <h3 className="font-serif text-xl mb-3">Sustainable Fashion Practices in 2023</h3>
                                                <p className="text-gray-700 text-sm">Exploring how sustainability is reshaping the fashion industry, from materials selection to production processes and end-of-life considerations.</p>
                                                <a href="#" className="mt-4 inline-block text-sm underline">Read more</a>
                                            </div>
                                        </div>

                                        {/* Blog Article 2 */}
                                        <div className="bg-white overflow-hidden h-full border border-gray-200 overflow-y-scroll">
                                            <div className="h-1/2 overflow-hidden">
                                                <img 
                                                    src="/images/mwm-step-3.png" 
                                                    alt="Color Theory in Visual Storytelling" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <p className="text-sm text-gray-500 mb-2">August 22, 2023</p>
                                                <h3 className="font-serif text-xl mb-3">Color Theory in Visual Storytelling</h3>
                                                <p className="text-gray-700 text-sm">How the strategic use of color palettes can enhance narrative and evoke emotional responses in visual media and brand communications.</p>
                                                <a href="#" className="mt-4 inline-block text-sm underline">Read more</a>
                                            </div>
                                        </div>

                                        {/* Blog Article 3 */}
                                        <div className="bg-white overflow-hidden h-full border border-gray-200 overflow-y-scroll">
                                            <div className="h-1/2 overflow-hidden">
                                                <img 
                                                    src="/images/mwm-step-5.png" 
                                                    alt="The Art of Ethical Styling" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <p className="text-sm text-gray-500 mb-2">October 5, 2023</p>
                                                <h3 className="font-serif text-xl mb-3">The Art of Ethical Styling</h3>
                                                <p className="text-gray-700 text-sm">Exploring the intersection of aesthetics and ethics in fashion styling, and how conscious choices can create beautiful visual narratives.</p>
                                                <a href="#" className="mt-4 inline-block text-sm underline">Read more</a>
                                            </div>
                                        </div>
                                    </Carousel>
                                </div>
                            ) : null}
                        </CustomDropdown>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className='relative max-w-dvw w-full min-h-dvh py-24 px-36 flex flex-col justify-center bg-gray-100'>
                {/* Main content area - two columns side by side */}
                <div className='w-full grid grid-cols-2 gap-16 mb-20'>
                    {/* Left column - Contact heading */}
                    <h2 className='font-serif text-8xl leading-tight'>
                        let's get
                        <br />
                        in touch
                    </h2>

                    {/* Right column - Contact details and form */}
                    <div className='flex flex-col justify-start'>
                        <div className='space-y-6'>
                            <div>
                                <p className='text-gray-500'>Email</p>
                                <a
                                    href='mailto:maiafrid@gmail.com'
                                    className='text-black hover:underline'
                                >
                                    maiafrid@gmail.com
                                </a>
                            </div>

                            <div>
                                <p className='text-gray-500'>Instagram</p>
                                <a
                                    href='https://instagram.com/maiafrid'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-black hover:underline'
                                >
                                    @maiafrid
                                </a>
                            </div>

                            <div className='mt-8'>
                                <p className='text-gray-500 mb-2'>or drop me a note:</p>
                                <textarea
                                    className='w-full border border-gray-300 p-4 h-40 focus:outline-none focus:border-gray-500 transition-colors'
                                    placeholder='Your message here...'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className='w-full border-t border-gray-200 pt-8'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xl font-medium w-1/5'>Subscribe to my newsletter</h3>

                        <div className='w-2/5'>
                            <p className='text-gray-600 text-sm'>I don't promise to write often, but I do promise to write with intention. Sincere words, ideas in motion, workshops, projects. A way to stay connected.</p>
                        </div>

                        <div className='flex gap-4 w-2/5'>
                            <input
                                type='email'
                                placeholder='email@example.com'
                                className='border border-gray-300 p-4 flex-grow focus:outline-none focus:border-gray-500 transition-colors'
                            />
                            <button className='bg-black text-white p-4 whitespace-nowrap hover:bg-gray-800 transition-colors'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* I am Section */}
            <section className='relative max-w-dvw w-full min-h-dvh py-24 px-36 flex flex-col justify-center bg-gray-200'>
                <div className='flex flex-col h-full justify-center space-y-36'>
                    {/* I am */}
                    <div className='flex items-baseline font-serif'>
                        <h2 className='text-8xl'>I am</h2>
                        <Typewriter
                            prefix='a'
                            words={iAmWords}
                            speed={125}
                            eraseSpeed={100}
                            delayBetweenWords={2000}
                        />
                    </div>

                    {/* I am interested in... */}
                    <div className='flex flex-col items-end font-serif'>
                        <h2 className='text-8xl'>I am interested</h2>
                        <Typewriter
                            prefix='in'
                            words={interestsWords}
                            speed={100}
                            eraseSpeed={75}
                            delayBetweenWords={3000}
                        />
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className='relative max-w-dvw w-full min-h-dvh py-24 px-36 flex flex-col justify-center bg-stone-100'>
                <div className='w-full h-full flex flex-col space-y-28'>
                    {/* Top section: Photo and About Me */}
                    <div className='grid grid-cols-12 gap-12'>
                        {/* Left column with image - spans 5 columns */}
                        <div className='col-span-5 flex items-start justify-center'>
                            <div className='w-full max-w-md'>
                                <img
                                    src='/images/maiafrid-profile.jpg'
                                    alt='Maia Frid profile'
                                    className='w-full aspect-[3/4] object-cover object-center grayscale'
                                />
                            </div>
                        </div>

                        {/* Right column with about text - spans 7 columns */}
                        <div className='col-span-7 flex flex-col justify-start pt-8 max-w-2xl'>
                            <h2 className='font-serif text-5xl mb-10 tracking-wide'>ABOUT ME</h2>
                            <p className='text-xl leading-relaxed font-light'>I am Maia Frid, a visual creator born in Buenos Aires, specializing in creative direction, styling, and sustainable narratives. My practice weaves together art, fashion, and ecological awareness to imagine possible futures through design and sensitivity.</p>
                            <p className='text-xl leading-relaxed font-light mt-6'>Through collaborations with brands, institutions, and communities, I create images and experiences that invite reflection, connection, and transformation.</p>
                        </div>
                    </div>

                    {/* Mission section */}
                    <div className='grid grid-cols-12 gap-12'>
                        <div className='col-span-3'>
                            <h2 className='font-serif text-4xl tracking-wide'>MISSION</h2>
                        </div>
                        <div className='col-span-9'>
                            <p className='text-xl leading-relaxed font-light max-w-3xl'>To cultivate a creative practice that dialogues with nature, honoring cycles, memories, and connections. My mission is to create conscious visual narratives that drive a fairer, regenerative, and sensitive fashion, in connection with the social, territorial, and spiritual.</p>
                        </div>
                    </div>

                    {/* Vision section */}
                    <div className='grid grid-cols-12 gap-12'>
                        <div className='col-span-3'>
                            <h2 className='font-serif text-4xl tracking-wide'>VISION</h2>
                        </div>
                        <div className='col-span-9'>
                            <p className='text-xl leading-relaxed font-light max-w-3xl'>I envision a future where fashion and art become languages for healing, planet care, and the celebration of diversity. I aspire to be a bridge between worlds — the visible and the invisible, the ancestral and the contemporary — proposing new ways to relate to our environment.</p>
                        </div>
                    </div>

                    {/* Objectives */}
                    <div className='grid grid-cols-12 gap-12'>
                        <div className='col-span-3'>
                            <h2 className='font-serif text-4xl tracking-wide'>OBJECTIVES</h2>
                        </div>
                        <div className='col-span-9'>
                            <div className='max-w-3xl space-y-6'>
                                <p className='text-xl leading-relaxed font-light'>Support design projects that integrate sustainability, aesthetics, and meaning.</p>
                                <p className='text-xl leading-relaxed font-light'>Foster creative processes that prioritize circularity, dialogue, and cultural transformation.</p>
                                <p className='text-xl leading-relaxed font-light'>Expand international networks of collaboration with a focus on climate justice and regenerative creativity.</p>
                                <p className='text-xl leading-relaxed font-light'>Research and communicate new pedagogies from conscious fashion and storytelling.</p>
                                <p className='text-xl leading-relaxed font-light'>Continue exploring desire as a vital force guiding our aesthetic, ethical, and spiritual decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Working Together Hero */}
            <section className='relative max-w-dvw w-full min-h-dvh py-24 px-36'>
                {/* Background image div */}
                <div
                    className='absolute inset-0 w-full h-full bg-cover bg-center z-0 flex items-center justify-center'
                    style={{ backgroundImage: 'url("/images/mwm-banner.PNG")' }}
                    aria-hidden='true'
                >
                    <h1 className='font-serif text-[3.5rem] text-center uppercase tracking-wide leading-none font-light text-white'>Step-by-Step: Working Together</h1>
                </div>
            </section>

            {/* Working Together Carousel */}
            <section className='relative max-w-dvw w-full min-h-dvh py-24 px-36 flex items-center justify-center bg-stone-200'>
                <Carousel
                    autoPlay={true}
                    autoPlayInterval={6000}
                    showArrows={true}
                    className='h-[75vh]'
                    itemsPerView={3}
                    gap={24}
                    label='Working together process steps'
                >
                    {workingTogetherSteps.map((step: StepData) => (
                        <div
                            key={step.id}
                            className='relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden'
                            onClick={() => {
                                document.getElementById(`step-${step.id}`)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                })
                            }}
                        >
                            {/* Background image */}
                            <div
                                className='absolute inset-0 w-full h-full bg-cover bg-center z-0'
                                style={{ backgroundImage: `url("${step.image}")` }}
                                aria-hidden='true'
                            />

                            {/* Overlay for better text readability */}
                            <div className='absolute inset-0 bg-black/30 z-10' />

                            {/* Step content */}
                            <div className='relative z-20 text-white px-4 w-full'>
                                <h2 className='font-serif text-3xl mb-3 uppercase tracking-wide'>
                                    Step {step.id}: {step.title}
                                </h2>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Work Steps Details */}
            <section className='relative max-w-dvw w-full py-24 px-36 flex flex-col justify-center bg-stone-200'>
                <h2 className='font-serif text-5xl mb-24 text-center tracking-wide'>THE PROCESS IN DETAIL</h2>
                <div className='space-y-24'>
                    {workingTogetherSteps.map((step: StepData) => (
                        <div
                            key={step.id}
                            id={`step-${step.id}`}
                        >
                            <h3 className='font-serif text-3xl mb-8 tracking-wide'>
                                Step {step.id}: {step.title}
                            </h3>

                            <div className='space-y-6'>
                                {step.details?.map((detail: DetailSection, index: number) => (
                                    <div
                                        key={index}
                                        className='mb-6'
                                    >
                                        <h4 className='font-serif text-xl mb-2'>{detail.title}</h4>
                                        <p className='text-gray-700 leading-relaxed font-light'>{detail.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Global Availability */}
                    <div className='mt-16 bg-stone-100 p-10'>
                        <h3 className='font-serif text-3xl mb-6 tracking-wide text-center'>{globalAvailability.title}</h3>
                        <p className='text-gray-700 leading-relaxed font-light text-center max-w-4xl mx-auto'>{globalAvailability.text}</p>
                    </div>
                </div>
            </section>

            {/* Hiring Reasons */}
            <section className='relative max-w-dvw w-full py-24 px-36 flex flex-col justify-center bg-stone-100'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-18'>
                    {/* Left Column */}
                    <div className='bg-stone-200 p-10 pl-20 rounded-r-2xl'>
                        <h2 className='font-serif text-4xl md:text-5xl mb-10 -mt-28'>
                            HIRE ME IF<br/>
                            YOU ARE<br/>
                            LOOKING FOR
                        </h2>

                        <div className='space-y-8 italic font-bold'>
                            <div className='flex justify-between items-center'>
                                <p>Branding & Identity</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                            
                            <div className='flex justify-between items-center'>
                                <p>Visual Boards</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                            
                            <div className='flex justify-between items-center'>
                                <p>Photo and Video Production</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                            
                            <div className='flex justify-between items-center'>
                                <p>Event Planning</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                            
                            <div className='flex justify-between items-center'>
                                <p>Graphic Design</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                            
                            <div className='flex justify-between items-center'>
                                <p>Advertising and Marketing Campaigns</p>
                                <div className='flex-grow border-t border-stone-400 ml-4 -mr-14'></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col justify-center p-10'>
                        <h2 className='font-serif text-4xl md:text-5xl mb-10 -mt-4 tracking-tight'>
                            AND NEED TO
                        </h2>

                        <div className='space-y-8'>
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Convey personality, style and brand values</p>
                            </div>
                            
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Present color schemes, styles, and textures</p>
                            </div>
                            
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Convey the visual style, tone and guide set design decisions</p>
                            </div>
                            
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Visualize decorations, themes, and overall ambiance</p>
                            </div>
                            
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Explore layout and visualize digital elements</p>
                            </div>
                            
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-stone-400 mr-4 -ml-14'></div>
                                <p className='text-gray-700'>Present creative ideas and themes for marketing campaigns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Simple Footer */}
            <footer className='bg-stone-800 text-white py-10 px-12'>
                <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
                    <div className='text-sm font-light'>
                        <p>© {new Date().getFullYear()} Maia Frid. All rights reserved.</p>
                    </div>
                    
                    <div className='flex items-center space-x-8'>
                        <a 
                            href='mailto:maiafrid@gmail.com' 
                            className='text-sm hover:text-stone-300 transition-colors'
                            aria-label='Send email to Maia Frid'
                        >
                            Contact
                        </a>
                        <div className='flex space-x-4'>
                            <a 
                                href='https://instagram.com/maiafrid' 
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-white hover:text-stone-300 transition-colors'
                                aria-label='Visit Instagram profile'
                            >
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                    <path 
                                        fillRule='evenodd' 
                                        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' 
                                        clipRule='evenodd' 
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default App
