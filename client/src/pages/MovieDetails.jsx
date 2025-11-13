import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'
import { Heart, Tickets, StarIcon, UserStar, CirclePlus } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import pageTitle from '../lib/pageTitle'

const MovieDetails = () => {
  
  const navigate = useNavigate()
  const {id} = useParams()
  const [show, setShow] = useState(null)

  const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useAppContext()

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`)

      if (data.success) {
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavorite = async () => {
    try {
      if(!user) return toast.error('Please sign in to add this movie under Favorites.')

      const { data } = await axios.post('/api/user/update-favorite', {movieId: id},
      {headers: { Authorization: `Bearer ${await getToken()}` }})

      if(data.success) {
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getShow()
  },[id])

  pageTitle(show ? `${show.movie.title} | Kinopia` : 'Movie Details | Kinopia')

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={image_base_url + show.movie.poster_path} 
             alt='' 
             className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />
          
          <p className='text-primary'>
            ENGLISH
          </p>

          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-zinc-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />

            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-zinc-400 mt-2 text-sm leading-tight max-w-xl'>
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(', ')} • {show.movie.release_date.split('-')[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <a href='#dateSelect' className='px-10 py-3 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer active:scale-95 flex items-center gap-2'>
              <Tickets className='inline' width={15} /> Buy Tickets
            </a>

            <button className='bg-zinc-700 hover:bg-zinc-500 p-2.5 rounded-full transition duration-500 cursor-pointer active:scale-95'
                    onClick={handleFavorite}
                    title={
                      favoriteMovies.find(movie => movie._id === id)
                        ? 'Remove from Favorites'
                        : 'Add to Favorites'
                    }>
              <Heart className={`w-5 h-5 ${favoriteMovies.find(movie => movie._id === id) ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <p className='text-2xl font-medium mt-20'>
        <UserStar className='inline -mt-1' width={21} /> Cast
      </p>
      
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={image_base_url + cast.profile_path} 
                   alt=''
                   className='rounded-full h-20 md:h-20 aspect-square object-cover' />

              <p className='font-medium text-xs mt-3'>
                {cast.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-4xl font-medium my-16'>
        You may also <span class='text-primary font-bold'>like</span>...
      </p>

      <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {shows.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </div>

      <div className='flex justify-center mt-20'>
          <button className='px-10 py-3 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer'
                  onClick={() => {navigate('/movies'); scrollTo(0, 0)}}>
            <CirclePlus className='inline -mt-1' width={18} /> Show More
          </button>
      </div>

    </div>
  ) : <Loading />
}

export default MovieDetails