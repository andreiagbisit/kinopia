import { assets } from '../assets/assets'
import pageTitle from '../lib/pageTitle'
import BlurCircle from './BlurCircle'

const PageNotFound = () => {
  
    pageTitle('Page Not Found | Kinopia')

    return (
        <div className='relative my-20 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[70vh]'>
            <BlurCircle top='150px' left='0px' />
            <BlurCircle bottom='50px' right='50px' />
            
            <img className='max-h-50 mt-45 mb-10 mx-auto block' 
                 src={assets.cry} 
                 alt='' />
            
            <h1 className='text-3xl font-light text-center mx-3 mb-10'>
                This page doesn't seem to exist.
            </h1>
        </div>
    )
}

export default PageNotFound