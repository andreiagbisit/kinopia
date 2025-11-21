import { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon, CalendarFold, TicketCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({dateTime, id}) => {
    
    const navigate = useNavigate()
    
    const [selected, setSelected] = useState(null)

    const onBookHandler = () => {
        if(!selected) {
            return toast('Please select a date.')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0, 0)
    }

    const hasDates = dateTime && Object.keys(dateTime).length > 0
  
    return (
        <div id='dateSelect' className='pt-30'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle top='100px' left='0px' />

                <div>
                    <p className='text-2xl font-semibold'>
                        <CalendarFold className='inline -mt-1' width={21} /> Select Date
                    </p>

                    {hasDates ? (
                        <div className='flex items-center ap-6 text-sm mt-5'>
                            <ChevronLeftIcon width={28} />

                            <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                                {Object.keys(dateTime)
                                 .sort((a, b) => new Date(a) - new Date(b))
                                 .map((date) => (
                                    <button key={date} 
                                            className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? 
                                                    'bg-primary text-white' : 'border border-primary/70'}`}
                                            onClick={() => setSelected(date)}>
                                        
                                        <span>{new Date(date).getDate()}</span>
                                        <span>{new Date(date).toLocaleDateString('en-US', {month: 'short'})}</span>
                                    </button>
                                ))}
                            </span>

                            <ChevronRightIcon width={28} />
                        </div>
                    ) : (
                        <div className='mt-5 text-zinc-400'>
                            There are no dates available.
                        </div>
                    )}
                </div>

                {hasDates && (
                    <button className='bg-primary text-white px-8 py-2 mt-6 rounded-full hover:bg-primary-dull transition font-semibold duration-500 cursor-pointer'
                            onClick={onBookHandler}>
                        <TicketCheck className='inline -mt-1' width={17} /> Book Now
                    </button>
                )}
            </div>
        </div>
    )
}

export default DateSelect