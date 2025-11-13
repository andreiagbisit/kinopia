import { assets } from '../assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useAppContext()

  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-10 w-full text-zinc-300'>
      <div className='flex flex-col md:flex-row justify-between w-full gap-10 border-b border-zinc-500 pb-14'>
        <div className='md:max-w-96'>
          <Link to='/'>
            <img alt='logo' className='h-11' src={assets.logo} />
          </Link>
          
          <p className='mt-6 text-sm'>
            Kinopia is your all-in-one movie ticketing platform—making it easier than ever to discover films, 
            check schedules, and secure your seats online. Whether you're into the latest blockbusters or 
            local favorites, Kinopia brings the cinema experience right to your fingertips.
          </p>
        </div>

        <div className='flex-1 flex items-start md:justify-end gap-20 md:gap-20'>
          <div>
            <h2 className='font-semibold mb-5 text-primary'>
              Links
            </h2>
            
            <ul className='text-sm space-y-2'>
                <li className='flex items-start gap-2 max-w-[250px] leading-snug'>
                  <Link className='footer-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/'>
                    Home
                  </Link>
                </li>

                <li className='flex items-start gap-2 max-w-[250px] leading-snug'>
                  <Link className='footer-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/movies'>
                    Movies
                  </Link>
                </li>

                {user && (
                  <li className='flex items-start gap-2 max-w-[250px] leading-snug'>
                    <Link className='footer-link' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/favorites'>
                      Favorites
                    </Link>
                  </li>
                )}

                {user && (
                  <li className='flex items-start gap-2 max-w-[250px] leading-snug'>
                    <Link className='footer-link whitespace-nowrap' onClick={() => {scrollTo(0,0); setIsOpen(false)}} to='/my-bookings'>
                      My Bookings
                    </Link>
                  </li>
                )}
            </ul>
          </div>

          <div>
            <h2 className='font-semibold mb-5 text-primary'>
              Contact
            </h2>
            
            <div className='text-sm space-y-2'>
              <p className='flex items-start gap-2 max-w-[250px] leading-snug'>
                <Phone className='inline -mt-0.5 shrink-0' width={15} /> (+63) 917-555-0123
              </p>
              
              <p className='flex items-start gap-2 max-w-[250px] leading-snug'>
                <Mail className='inline -mt-0.5 shrink-0' width={15} /> support@kinopia.ph
              </p>

              <p className='flex items-start gap-2 max-w-[250px] leading-snug'>
                <MapPin className='inline -mt-0.5 shrink-0' width={15} /> Unit 5, 3rd Floor, Horizon Drive, Galeria Angeles, Angeles City, Pampanga 2009
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className='pt-4 text-center text-sm pb-5'>
        &copy; <span className='font-bold'>{new Date().getFullYear()} <span className='text-primary'> Kinopia</span></span>. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer