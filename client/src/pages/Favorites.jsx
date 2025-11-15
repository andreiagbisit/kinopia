import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import pageTitle from '../lib/pageTitle'
const Favorites = () => {

  const {favoriteMovies} = useAppContext()

  pageTitle('Favorites | Kinopia')

  return favoriteMovies.length > 0 ?  (
    <div className='relative my-20 mb-20 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <p className='text-4xl font-medium my-16'>
        Your <span class='text-primary font-bold'>Favorites</span>
      </p>

      <div className='flex flex-wrap max-sm:justify-center gap-8 pb-8'>
        {favoriteMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='relative my-20 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[70vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='50px' right='50px' />

      <p className='text-4xl font-medium my-16'>
        Your <span class='text-primary font-bold'>Favorites</span>
      </p>
      
      <img className='max-h-50 mt-20 mb-10 mx-auto block' 
           src={assets.notFound} 
           alt='' />
      
      <h1 className='text-3xl font-light text-center mx-3 mb-10'>
        There are no movies added.
      </h1>
    </div>
  )
}

export default Favorites