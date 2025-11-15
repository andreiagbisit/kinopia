import { useEffect, useState } from 'react'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { HandCoins } from 'lucide-react'
import pageTitle from '../lib/pageTitle'
import Loading from '../components/Loading'

const MyBookings = () => {
  
  const currency = import.meta.env.VITE_CURRENCY
  
  const { axios, getToken, user, image_base_url } = useAppContext()
  
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try {
      const {data} = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
        console.log(error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if(user) {
      getMyBookings()     
    }
  }, [user])

  pageTitle('My Bookings | Kinopia')
  
  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-20 pb-30 md:pb-10 min-h-[80vh]'>
      {bookings.length > 0 && (
        <>
          <BlurCircle top='100px' left='100px' />
          <BlurCircle bottom='0px' right='600px' />
        </>
      )}

      <p className='text-4xl font-medium my-16'>
        My <span class='text-primary font-bold'>Bookings</span>
      </p>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div key={index} 
              className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
            <div className='flex flex-col md:flex-row'>
              <img src={image_base_url + item.show.movie.poster_path} 
                  alt=''
                  className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />

              <div className='flex flex-col p-4'>
                <p className='text-lg font-semibold'>
                  {item.show.movie.title}
                </p>

                <p className='text-zinc-400 text-sm'>
                  {timeFormat(item.show.movie.runtime)}
                </p>

                <p className='text-zinc-400 text-sm mt-auto'>
                  {dateFormat(item.show.showDateTime)}
                </p>
              </div>
            </div>

            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
              <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold mb-3 text-indigo-300'>
                  {currency}{item.amount.toLocaleString()}
                </p>

                {!item.isPaid && 
                  <Link className='bg-primary px-3 py-1.5 mb-3 text-base font-semibold transition duration-500 hover:bg-primary-dull rounded-full cursor-pointer'
                        to={item.paymentLink}>
                    <HandCoins className='inline -mt-0.5' width={15} /> Pay Now
                  </Link> 
                }
              </div>

              <div className='text-sm'>
                <p>
                  <span className='text-zinc-400'>Total No. of Tickets:</span> {item.bookedSeats.length}
                </p>

                <p>
                  <span className='text-zinc-400'>Seat No.:</span> {item.bookedSeats.join(', ')}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img className='max-h-50 mb-10 mx-auto block' 
               src={assets.notFound} 
               alt='' />
          
          <h1 className='text-3xl font-light text-center mx-3'>
            No bookings found.
          </h1>
        </div>
      )}
    </div>
  ) : <Loading />
}

export default MyBookings