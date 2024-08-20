import React from 'react'
import Image from 'next/image'

function BrandItem() {
    return (
        <Image
            src="/assets/ford.png"
            width="56"
            height="40"
            alt="ford"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}


        />
    )
}

export default BrandItem