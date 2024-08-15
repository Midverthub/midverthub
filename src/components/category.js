import React from 'react'
import Image from 'next/image'

function Category() {
    return (
        <div className='categoryDiv d-flex'>
            <div className='categoryImg'>
                <Image
                    fill
                    src="/assets/categoryImg1.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='category image'
                    style={{ objectFit: 'cover' }}

                />
            </div>
            <p className='categoryPgh'> Vehicles</p>
        </div>

    )
}

export default Category