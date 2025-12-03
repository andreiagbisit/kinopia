import { CircleArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
  
    const navigate = useNavigate()

    const fade = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } }
    }

    const fadeX1 = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.7 } }
    }

    const fadeX2 = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 1.4 } }
    }

    const fadeScale = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 1.8 } }
    }

    return (
        <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
            <motion.div initial='hidden'
                        animate='visible'
                        variants={fade}>
                <img className='max-md:h-10 h-11 mt-20' src={assets.disneyLogo} alt='' />
                <img className='max-md:h-14 h-21.5 my-1' src={assets.tronAresLogo} alt='' />
            </motion.div>

            <motion.div className='flex items-center gap-4 text-zinc-300 max-md:text-sm'
                        initial='hidden'
                        animate='visible'
                        variants={fadeX1}>
                <span>
                    <span className='font-bold text-white'>Action</span> | <span className='font-bold text-white'>Adventure</span> | <span className='font-bold text-white'>Sci-fi</span>
                </span>

                <div className='flex items-center gap-1'>
                    <CalendarIcon className='w-4.5 h-4.5 -mt-0.5' /> <span className='font-bold text-white'>2025</span>
                </div>

                <div className='flex items-center gap-1'>
                    <ClockIcon className='w-4.5 h-4.5' /> <span className='font-bold text-white'>1h 59m</span>
                </div>
            </motion.div>

            <motion.p className='max-w-md text-zinc-300 max-md:text-sm'
                      initial='hidden'
                      animate='visible'
                      variants={fadeX2}>
                A highly sophisticated program called Ares is sent from the digital world 
                into the real world on a dangerous mission, marking humankind's first 
                encounter with AI beings.
            </motion.p>

            <motion.div initial='hidden'
                        animate='visible'
                        variants={fadeScale}>
                <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer'>
                    Explore Movies <CircleArrowRight className='w-5 h-5 ml-1' />
                </button>
            </motion.div>
        </div>
    )
}

export default HeroSection