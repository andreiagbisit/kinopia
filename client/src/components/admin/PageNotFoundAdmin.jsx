import { assets } from "../../assets/assets"
import pageTitle from "../../lib/pageTitle"

const PageNotFoundAdmin = () => {
  
    pageTitle('Page Not Found | Kinopia (Admin)')

    return (
        <div>
            <img className='max-h-50 mt-25 md:mt-60 mb-10 mx-auto block' 
                 src={assets.cry} 
                 alt='' />
            
            <h1 className='text-3xl font-light text-center mx-3'>
                This page doesn't seem to exist.
            </h1>
        </div>
    )
}

export default PageNotFoundAdmin