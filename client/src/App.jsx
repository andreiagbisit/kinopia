import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorites from './pages/Favorites'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'
import PageNotFound from './components/PageNotFound'
import PageNotFoundAdmin from './components/admin/PageNotFoundAdmin'

const App = () => {
  
  const location = useLocation()
  const { user } = useAppContext()

  const isAdminRoute = location.pathname.startsWith('/admin')
  const hideNavbar = (!user && (location.pathname === '/my-bookings' || location.pathname === '/favorites'))

  return (
    <>
      <Toaster />
      {!isAdminRoute && !hideNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        
        <Route path='/my-bookings' element={user ? <MyBookings /> : (
          <div className='sign-in-wrapper'>
            <SignIn fallbackRedirectUrl='/my-bookings' />
          </div>
        )}/>
        
        <Route path='/favorites' element={user ? <Favorites /> : (
          <div className='sign-in-wrapper'>
            <SignIn fallbackRedirectUrl='/favorites' />
          </div>
        )}/>

        <Route path='/admin/*'
               element={user?.privateMetadata?.role === 'admin' ? (
                 <Layout />
               ) : (
                 <div className='sign-in-wrapper'>
                   <SignIn fallbackRedirectUrl='/admin' />
                 </div>
               )}>
          
          {isAdmin && (
            <>
              <Route index element={<Dashboard/>} />
              <Route path='add-shows' element={<AddShows/>} />
              <Route path='list-shows' element={<ListShows/>} />
              <Route path='list-bookings' element={<ListBookings/>} />
              <Route path="*" element={<PageNotFoundAdmin />} />
            </>
          )}
        </Route>

        <Route path='/loading/:nextUrl' element={<Loading />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!isAdminRoute && !hideNavbar && <Footer />}
    </>
  )
}

export default App