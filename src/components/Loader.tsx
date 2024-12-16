import React from 'react'
import Image from 'next/image'

function Loader() {
  return (
    <div className='loader'>
        <Image 
        src="/assets/icons/loader.svg"
        alt='Loader'
        height={32}
        width={32}
        className='animate-spin'/>
        Loading......
    </div>
    
  )
}

export default Loader