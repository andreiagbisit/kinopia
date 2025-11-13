import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'
import pageTitle from '../../lib/pageTitle'

const ListBookings = () => {
    
    const currency = import.meta.env.VITE_CURRENCY

    const {axios, getToken, user} = useAppContext()

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-bookings', {
                headers: { Authorization: `Bearer ${await getToken()}` }})

            setBookings(data.bookings)

        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            getAllBookings()
        }
    }, [user])

    pageTitle('List Bookings | Kinopia (Admin)')

    return !isLoading ? (
        <>
            <Title text1='List' 
                   text2='Bookings' />
            
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap max-[983px]:mb-4'>
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>Username</th>
                            <th className='p-2 font-medium'>Movie Title</th>
                            <th className='p-2 font-medium'>Screening Time</th>
                            <th className='p-2 font-medium'>Seats</th>
                            <th className='p-2 font-medium'>Amount</th>
                        </tr>
                    </thead>

                    <tbody className='text-sm font-light'>
                        {bookings.length > 0 ? (
                            bookings.map((item, index) => (
                                <tr key={index}
                                    className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
                                    <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                                    <td className='p-2'>{item.show.movie.title}</td>
                                    <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                                    <td className='p-2'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(', ')}</td>
                                    <td className='p-2'>{currency}{item.amount.toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} 
                                    className='border-b border-primary/20 bg-primary/5 even:bg-primary/10 text-center py-4 text-zinc-400'>                    
                                        <p>No records found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    ) : <Loading />
}

export default ListBookings