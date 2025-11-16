import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, TicketPlus, XIcon, House, Clapperboard, HeartPlus, LogIn, UserRoundCog } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  
    const [isOpen, setIsOpen] = useState(false)
    const {user, isLoaded} = useUser()
    const {openSignIn} = useClerk()
    
    const navigate = useNavigate()

    const {isAdmin} = useAppContext()

    if (!isLoaded) return null

    return (
        <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
            <Link className='max-md:flex-1' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>
                <img src={assets.logo} alt='' className='w-36 h-auto drop-shadow-[4px_3px_2px_rgba(0,0,0,0.9)]' />
            </Link>

            <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
                            max-md:text-lg z-50 flex flex-col md:flex-row items-center
                            max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen
                            md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
                            border-zinc-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

                <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer transition duration-500 hover:text-primary' 
                       onClick={() => setIsOpen(!isOpen)} />

                <Link className='nav-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>
                    <House className='inline' width={15} />Home
                </Link>
                
                <Link className='nav-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/movies'>
                    <Clapperboard className='inline' width={15} />Movies
                </Link>
                
                {user && (
                    <Link className='nav-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/favorites'>
                        <HeartPlus className='inline' width={15} />Favorites
                    </Link>
                )}

                {user && (
                    <Link className='nav-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/my-bookings'>
                        <TicketPlus className='inline' width={15} />My Bookings
                    </Link>
                )}
            </div>

            <div className='flex items-center gap-8'>

                {
                    !user ? (
                        <button onClick={openSignIn} 
                                className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition duration-500 rounded-full font-semibold cursor-pointer drop-shadow-[4px_4px_4px_rgba(0,0,0,0.6)] flex items-center gap-2'>
                            <LogIn className='inline' width={15} /> Sign In
                        </button>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                {isAdmin && (
                                    <UserButton.Action label='Admin dashboard'
                                                       labelIcon={<UserRoundCog className='-mt-1' width={15} />}
                                                       onClick={() => navigate('/admin')} />
                                )}
                            </UserButton.MenuItems>
                        </UserButton>
                    )
                }
            </div>

            <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer transition duration-500 hover:text-primary'
                      onClick={() => setIsOpen(!isOpen)} />

        </div>
    )
}

export default Navbar