import React from 'react'
import Image from 'next/image'

function HomepageBanner() {
    return (
        <div className='homepageBanner'>
            <Image
                fill
                src="/assets/homepage banner.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='Homepage Banner'
                style={{ objectFit: 'cover' }}

            />
        </div>
    )
}

export default HomepageBanner