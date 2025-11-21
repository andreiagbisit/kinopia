import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { CircleArrowRight, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import pageTitle from '../lib/pageTitle'

const SeatLayout = () => {
    
  const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J']]
  
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])
  
  const navigate = useNavigate()

  const {axios, getToken, user} = useAppContext()

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

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast('Please select an available time slot first.')
    }

    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast('You can only select a maximum of 5 seats.')
    }

    if(occupiedSeats.includes(seatId)) {
      return toast('This seat is already occupied.')
    }

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          
          return (
            <button key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
                              ${selectedSeats.includes(seatId) && 'bg-primary text-white'}
                              ${occupiedSeats.includes(seatId) && 'opacity-50'}`}>
                      {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`)

      if (data.success) {
        setOccupiedSeats(data.occupiedSeats)
      
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const bookTickets = async () => {
    try {
      if(!user) return toast.error('Please sign in to manage your request.')

        if(!selectedTime || !selectedSeats.length) 
          return toast.error('Please select an available time and seat.')

        const {data} = await axios.post('/api/booking/create', {showId: selectedTime.showId, selectedSeats}, {
          headers: { Authorization: `Bearer ${await getToken()}` }
        })

        if (data.success) {
          window.location.href = data.url
        } else {
          toast.error(data.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getShow()
  }, [])

  useEffect(() => {
    if(selectedTime) {
      getOccupiedSeats()
    }
  }, [selectedTime])

  pageTitle('Select Seat | Kinopia')

  return show ? (
    <div className='flex flex-col mf:flex-row px-6 md:px-16 lg:px-34 py-30 md:pt-50'>
      {/* AVAILABLE TIME SLOTS */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max min-[1745.4px]:sticky min-[1745.4px]:top-30 z-50 min-[768px]:mb-10 max-[1536px]:mb-10'>
      
        <p className='text-lg font-semibold px-6'>
          Movie
        </p>
        
        <p className='text-sm text-zinc-300 px-6 mb-2'>
          {show.movie.title}
        </p>

        <p className='text-lg font-semibold px-6'>
          Date
        </p>
        
        <p className='text-sm text-zinc-300 px-6 mb-2'>
          {new Date(date).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <p className='text-lg font-semibold px-6'>
          Available Time Slots
        </p>

        <div className='mt-2 space-y-1'>
          {show.dateTime[date]
           .sort((a, b) => a.time.localeCompare(b.time))
           .map((item) => (
            <div className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition duration-500 ${selectedTime?.time === item.time ? 
                            'bg-primary text-white' : 'hover:bg-primary/20'}`}
                  key={item.time}
                  onClick={() => setSelectedTime(item)}>
              <ClockIcon className='inline -mt-0.5' width={15} />

              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEATS LAYOUT */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-5 min-[1731.8px]:-mt-110'>
          <BlurCircle top='-100px' left='-100px' />
          <BlurCircle bottom='0' right='0' />
          
          <div className='w-full overflow-x-auto scrollbar-hide'>
            <div className='flex flex-col items-center text-center min-w-[840px]'>
              <h1 className='text-2xl font-semibold mb-4'>
                Select Your Seat
              </h1>

              <img src={assets.screenImage} alt='screen' />

              <p className='text-zinc-400 text-sm mb-6'>
                SCREEN
              </p>
            </div>

            <div className='flex flex-col items-center mt-10 text-cs text-zinc-300 min-w-[840px] max-[1112px]:mb-8'>
              <div className='grid grid-cols-2 gap-8 mb-6'>
                {groupRows[0].map(row => renderSeats(row))}
              </div>

              <div className='grid grid-cols-2 gap-11'>
                {groupRows.slice(1).map((group, idx) => (
                  <div key={idx}>
                    {group.map(row => renderSeats(row))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className='flex items-center gap-1 mt-20 px-10 py-3 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer active:scale-95'
                  onClick={bookTickets}>
            Proceed to Checkout

            <CircleArrowRight strokeWidth={3} className='w-4 h-4' />
          </button>

      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout