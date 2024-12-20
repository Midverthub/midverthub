import React from 'react'
import Image from 'next/image'

function Category({ title, image }) {
    return (
        <div className='categoryDiv d-flex'>
            <div className='categoryImg'>
                <Image
                    fill
                    src={image}
                    // src="/assets/categoryImg1.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='category image'
                // style={{ objectFit: 'contain' }}

                />
            </div>
            <p className='categoryPgh'> {title}</p>
        </div>

    )
}

export default Category