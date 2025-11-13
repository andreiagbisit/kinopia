import { CircleArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  
    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
            <img className='max-h-11 lg:h-11 mt-20' src={assets.disneyLogo} alt='' />

            <img className='max-h-21.5 lg:h-21.5 my-1' src={assets.tronAresLogo} alt='' />

            <div className='flex items-center gap-4 text-zinc-300'>
                <span>
                    <span className='font-bold text-white'>Action</span> | <span className='font-bold text-white'>Adventure</span> | <span className='font-bold text-white'>Sci-fi</span>
                </span>

                <div className='flex items-center gap-1'>
                    <CalendarIcon className='w-4.5 h-4.5 -mt-0.5' /> <span className='font-bold text-white'>2025</span>
                </div>

                <div className='flex items-center gap-1'>
                    <ClockIcon className='w-4.5 h-4.5' /> <span className='font-bold text-white'>1h 59m</span>
                </div>
            </div>

            <p className='max-w-md text-zinc-300'>
                A highly sophisticated program called Ares is sent from the digital world 
                into the real world on a dangerous mission, marking humankind's first 
                encounter with AI beings.
            </p>

            <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer'>
                Explore Movies <CircleArrowRight className='w-5 h-5 ml-1' />
            </button>
        </div>
    )
}

export default HeroSection