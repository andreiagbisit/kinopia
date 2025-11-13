import { CirclePlus, Film, LayoutDashboardIcon, Ticket } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AdminSidebar = () => {
    
    const { user } = useUser()

    const firstName = user.firstName
    const lastName = user.lastName
    const imageUrl = user.imageUrl

    const adminNavLinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-shows', icon: CirclePlus },
        { name: 'List Shows', path: '/admin/list-shows', icon: Film },
        { name: 'List Bookings', path: '/admin/list-bookings', icon: Ticket }
    ]
  
    return (
        <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-zinc-300/20 text-sm'>
            <img className='h-8 w-8 md:h-14 md:w-14 rounded-full mx-auto' 
                 src={imageUrl} 
                 alt='sidebar' />

            <p className='mt-2 mb-2 text-base max-md:hidden font-semibold'>
                {firstName} {lastName}
            </p>

            <p className='text-zinc-300 text-xs font-semibold px-2 py-0.5 border border-primary rounded-full max-md:hidden'>
                ADMIN
            </p>

            <div className='w-full'>
                {adminNavLinks.map((link, index) => (
                    <NavLink end 
                             key={index}
                             to={link.path}      
                             className={({ isActive }) => `relative flex font-semibold items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6
                                                          ${!isActive ? 'text-zinc-400' : 'bg-primary/15 text-indigo-300 group'}`}>

                        {({ isActive }) => (
                            <>
                                <link.icon className='w-5 h-5 -mt-0.5' />
                                
                                <p className='max-md:hidden'>
                                    {link.name}
                                </p>

                                <span className={`w-1.5 h-10 rounded-1 right-0 absolute 
                                                ${isActive && 'bg-primary'}`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default AdminSidebar