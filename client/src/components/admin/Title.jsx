
const Title = ({ text1, text2 }) => {
  return (
    <h1 className='font-medium text-3xl'>
        {text1}{' '}
        
        <span className='text-primary font-bold'>
            {text2}
        </span>
    </h1>
  )
}

export default Title