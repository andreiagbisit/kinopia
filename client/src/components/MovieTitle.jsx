import { useRef, useEffect, useState } from 'react'

function MovieTitle({ title }) {
  const ref = useRef(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = ref.current;
    if (el) setIsOverflowing(el.scrollWidth > el.clientWidth);
  }, [title])

  return (
    <div className='relative w-full overflow-hidden'>
      <p ref={ref}
         className={`font-medium whitespace-nowrap ${isOverflowing ? 'animate-marquee' : 'truncate'}`}>
        {title}
      </p>
    </div>
  )
}

export default MovieTitle