import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { CheckIcon, DeleteIcon, StarIcon, Plus } from 'lucide-react'
import Title from '../../components/admin/Title'
import { kConverter } from '../../lib/kConverter'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import MovieTitle from '../../components/MovieTitle'
import { timeFormat12h } from '../../lib/timeFormat12h'
import { dateFormatMdy } from '../../lib/dateFormatMdy'
import pageTitle from '../../lib/pageTitle'

const AddShows = () => {
  
    const {axios, getToken, user, image_base_url} = useAppContext()
    
    const currency = import.meta.env.VITE_CURRENCY
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [dateTimeSelection, setDateTimeSelection] = useState({})
    const [dateTimeInput, setDateTimeInput] = useState('')
    const [showPrice, setShowPrice] = useState('')
    const [addingShow, setAddingShow] = useState(false)

    const fetchNowPlayingMovies = async () => {
        try {
            const { data } = await axios.get('/api/show/now-playing', {
                headers: { Authorization: `Bearer ${await getToken()}` }})

                if(data.success) {
                    setNowPlayingMovies(data.movies)
                }
        } catch (error) {
            console.error('Error fetching movies:', error)
        }
    }
    
    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return
        const [date, time] = dateTimeInput.split('T')
        if (!date || !time) return

        setDateTimeSelection((prev) => {
            const times = prev[date] || []
            if (!times.includes(time)) {
                return { ...prev, [date] : [...times, time] }
            }
        })
    }

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            const filteredTimes = prev[date].filter((t) => t !== time)
            if (filteredTimes.length === 0) {
                const { [date]: _, ...rest } = prev
                return rest
            }

            return {
                ...prev,
                [date]: filteredTimes,
            }
        })
    }
    
    const handleSubmit = async () => {
        try {
            setAddingShow(true)

            if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
                return toast('Please fill in the required fields.')
            }

            const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({date, time}))

            const payload = {
                movieId: selectedMovie,
                showsInput,
                showPrice: Number(showPrice)
            }

            const { data } = await axios.post('/api/show/add', payload, {headers: { 
                Authorization: `Bearer ${await getToken()}` }})

                if(data.success) {
                    toast.success(data.message)
                    setSelectedMovie(null)
                    setDateTimeSelection({})
                    setShowPrice('')
                } else {
                    toast.error(data.message)
                }
        } catch (error) {
            console.error('There was an error submitting the data.', error)
            toast.error('An error occurred. Please try again.')
        }

        setAddingShow(false)
    }
    
    useEffect(() => {
        if (user) {
            fetchNowPlayingMovies()
        }
    }, [user])

    pageTitle('Add Shows | Kinopia (Admin)')

    return nowPlayingMovies.length > 0 ? (
        <>
            <Title text1='Add' 
                    text2='Shows' />

            <p className='mt-3 text-lg font-semibold'>
                Now Playing
            </p>

            <div className='overflow-x-auto pb-4'>
                <div className='group flex flex-wrap gap-4 mt-4 w-max'>
                    {nowPlayingMovies.map((movie) => (
                        <div className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}
                             key={movie.id}
                             onClick={() => setSelectedMovie(movie.id)}>
                            
                            <div className='relative rounded-lg overflow-hidden'>
                                <img src={image_base_url + movie.poster_path} 
                                     alt=''
                                     className='w-full h-60 object-cover brightness-90' />

                                <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                                    <p className='flex items-center gap-1 text-zinc-400'>
                                        <StarIcon className='w-4 h-4 text-primary fill-primary' />
                                        
                                        {movie.vote_average.toFixed(1)}
                                    </p>

                                    <p className='text-zinc-300'>
                                        {kConverter(movie.vote_count)} Votes
                                    </p>
                                </div>
                            </div>

                            {selectedMovie === movie.id && (
                                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                                    <CheckIcon className='w-4 h-4 text-white'
                                               strokeWidth={2.5} />
                                </div>
                            )}

                            <p className='mt-2'>
                                <MovieTitle title={movie.title} />
                            </p>

                            <p className='text-zinc-400 text-sm'>
                                {dateFormatMdy(movie.release_date)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SHOW PRICE INPUT */}
            <div className='mt-8'>
                <label className='block mb-1 text-lg font-semibold'>
                    Show Price
                </label>

                <div className='inline-flex items-center gap-2 border border-zinc-600 px-3 py-2 rounded-md'>
                    <p className='text-zinc-400 text-sm'>
                        {currency}
                    </p>

                    <input min={0}
                           type='number'
                           value={showPrice}
                           onChange={(e) => setShowPrice(e.target.value)}
                           placeholder='Enter screening price...'
                           className='outline-none' />
                </div>
            </div>

            {/* DATE & TIME SELECTION */}
            <div className='mt-4'>
                <label className='block mb-1 text-lg font-semibold'>
                    Select Date & Time
                </label>

                <div className='inline-flex gap-5 border border-zinc-600 p-1 pl-3 rounded-lg'>
                    <input type='datetime-local'
                           value={dateTimeInput}
                           onChange={(e) => setDateTimeInput(e.target.value)}
                           className='outline-none rounded-md' />
                    
                    <button onClick={handleDateTimeAdd}
                            className='bg-primary text-white px-3 py-2 text-sm font-semibold transition duration-500 rounded-lg hover:bg-primary-dull cursor-pointer'
                            title='Add Time'>
                        <Plus width={18} />
                    </button>
                </div>
            </div>

            {/* DISPLAY SELECTED TIME */}
            {Object.keys(dateTimeSelection).length > 0 && (
                <div className='mt-4'>
                    <h2 className='mb-1 text-lg font-semibold'>
                        Selected Date & Time
                    </h2>

                    <ul className='space-y-3'>
                        {Object.entries(dateTimeSelection).map(([date, times]) => (
                            <li key={date}>
                                <div className='font-medium text-indigo-300'>
                                    {dateFormatMdy(date)}
                                </div>

                                <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                                    {times.map((time) => (
                                        <div key={time}
                                             className='border border-primary px-2 py-1 flex items-center rounded'>
                                            
                                                {timeFormat12h(time)}

                                            <DeleteIcon onClick={() => 
                                                        handleRemoveTime(date, time)}
                                                        width={15}
                                                        className='ml-2 text-indigo-500 hover:text-indigo-700 cursor-pointer' />
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleSubmit}
                    disabled={addingShow}
                    className='bg-primary text-white px-8 py-2 mt-6 rounded-full hover:bg-primary-dull transition duration-500 font-semibold cursor-pointer'>
                Add Show
            </button>
        </>
    ) : <Loading />
}

export default AddShows