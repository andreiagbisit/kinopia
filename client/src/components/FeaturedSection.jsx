import { ChevronRight, CircleArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const FeaturedSection = () => {
  
    const navigate = useNavigate()
    const {shows} = useAppContext()
  
    if (!shows || shows.length === 0) {
        return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right='-80px' />
                
                <p className='text-zinc-300 font-medium text-4xl'>
                    Now <span className='text-primary font-bold'>Showing</span>
                </p>
            </div>

            <div className='flex flex-col items-center justify-center text-center mt-8'>
                <BlurCircle top='-100px' right='-100px' />
                
                <img className='max-h-70 mt-20 mb-10 mx-auto block'
                     src={assets.notFound}
                     alt='' />
                
                <h1 className='text-3xl font-light'>
                    There are no movies available at the moment.
                </h1>
            </div>
        </div>
        )
    }

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right='-80px' />
                
                <p className='text-zinc-300 font-medium text-4xl'>
                    Now <span class='text-primary font-bold'>Showing</span>
                </p>
                
                <button onClick={() => navigate('/movies')} className='group flex items-center gap-2 text-md text-zinc-300 font-semibold cursor-pointer transition duration-500 hover:text-primary'>
                    View All <ChevronRight className='group-hover:translate-x-0.5 w-4.5 h-4.5' />
                </button>
            </div>

            <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
                {shows.slice(0, 5).map((show) => (
                    <MovieCard key={show._id} movie={show} />
                ))}
            </div>

            <div className='flex justify-center mt-20'>
                <button className='px-10 py-3 bg-primary hover:bg-primary-dull transition duration-500 font-semibold cursor-pointer rounded-full flex items-center gap-2'
                        onClick={() => {navigate('/movies'); scrollTo(0,0)}}>
                    Show More <CircleArrowRight className='inline' width={20} />
                </button>
            </div>
        </div>
    )
}

export default FeaturedSection