import FeaturedSection from '../components/FeaturedSection'
import HeroSection from '../components/HeroSection'
import TrailersSection from '../components/TrailersSection'
import pageTitle from '../lib/pageTitle'

const Home = () => {
  
  pageTitle('Home | Kinopia')

  return (
    <>
        <HeroSection />
        <FeaturedSection />
        <TrailersSection />
    </>
  )
}

export default Home