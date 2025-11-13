import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import pageTitle from '../lib/pageTitle'

const Movies = () => {

  const { shows } = useAppContext()

  pageTitle('Movies | Kinopia')
  
  return shows.length > 0 ?  (
    <div className='relative my-20 mb-20 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <p className='text-4xl font-medium my-16'>
        All <span class='text-primary font-bold'>Movies</span>
      </p>

      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {shows.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='relative my-20 mb-20 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <p className='text-4xl font-medium my-16'>
        All <span class='text-primary font-bold'>Movies</span>
      </p>
      
      <div className='max-sm:justify-center gap-8'>
        <img className='max-h-70 mt-20 mb-10 mx-auto block'
              src={assets.notFound}
              alt='' />
        
        <h1 className='text-3xl font-light text-center'>
          There are no movies available.
        </h1>
      </div>
    </div>
  )
}

export default Movies