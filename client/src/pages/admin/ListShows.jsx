import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'
import pageTitle from '../../lib/pageTitle'

const ListShows = () => {
    
    const currency = import.meta.env.VITE_CURRENCY

    const {axios, getToken, user} = useAppContext()
  
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllShows = async () => {
        try {
            const { data } = await axios.get('/api/admin/all-shows', {
                headers: { Authorization: `Bearer ${await getToken()}` }})

            setShows(data.shows)
            setLoading(false)
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(user) {
            getAllShows()
        }
    }, [user])

    pageTitle('List Shows | Kinopia (Admin)')

    return !loading ? (
        <>
            <Title text1='List' 
                   text2='Shows' />
            
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap max-[983px]:mb-4'>
                    <thead>
                        <tr className='bg-primary/20 text-left text-white'>
                            <th className='p-2 font-medium pl-5'>Movie Title</th>
                            <th className='p-2 font-medium'>Screening Time</th>
                            <th className='p-2 font-medium'>Total Bookings</th>
                            <th className='p-2 font-medium'>Earnings</th>
                        </tr>
                    </thead>

                    <tbody className='text-sm font-light'>
                        {shows.length > 0 ? (
                            shows.map((show, index) => (
                                <tr key={index}
                                    className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                                        <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                                        <td className='p-2'>{dateFormat(show.showDateTime)}</td>
                                        <td className='p-2'>{Object.keys(show.occupiedSeats).length.toLocaleString()}</td>
                                        <td className='p-2'>{currency}{(Object.keys(show.occupiedSeats).length * show.showPrice).toLocaleString()}</td>
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

export default ListShows