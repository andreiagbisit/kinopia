import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const TrailersSection = () => {
  
    const { axios } = useAppContext()
    const [trailers, setTrailers] = useState([])
    const [currentTrailer, setCurrentTrailer] = useState(null)

    useEffect(() => {
        const fetchTrailers = async () => {
        try {
            const { data } = await axios.get('api/trailer/now-playing-trailers')
            setTrailers(data)
            setCurrentTrailer(data[0])
        } catch (err) {
            console.error('Failed to fetch trailers:', err)
        }
        }

        fetchTrailers()
    }, [])

    if (!trailers.length) return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <p className='text-zinc-300 font-medium text-4xl max-w-[960px] mx-auto pb-10 text-center'>
                Featured <span class='text-primary font-bold'>Trailers</span>
            </p>
            
            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px' />
                <img className='max-h-50 mt-20 mb-10 mx-auto block' 
                     src={assets.notFound} 
                     alt='' />

                <h1 className='text-3xl font-light text-center mx-3'>
                    There are no trailers available at the moment.
                </h1>
            </div>
        </div>
    )

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
            <p className='text-zinc-300 font-medium text-4xl max-w-[960px] mx-auto pb-10 text-center'>
                Featured <span class='text-primary font-bold'>Trailers</span>
            </p>
            
            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px' />

                {currentTrailer && (
                <ReactPlayer
                    src={currentTrailer.videoUrl}
                    controls={true}
                    className='mx-auto max-w-full'
                    width='960px'
                    height='540px'
                />
                )}
            </div>

            <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
                {trailers.map((trailer) => (
                    <div key={trailer.image} 
                         className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'
                         onClick={() => setCurrentTrailer(trailer)}>
                        
                        <img src={trailer.image} 
                             alt='trailer' 
                             className='rounded-lg w-full h-full object-cover brightness-75' />

                        <PlayCircleIcon strokeWidth={1.6} 
                                        className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrailersSection