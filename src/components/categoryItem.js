import React from 'react'
import Image from 'next/image'

function CategoryItem() {
    return (
        <div className='categoryItemDiv d-flex'>
            <div className='categoryItemImg'>
                <Image
                    width={56}
                    height={40}
                    src="/assets/car.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Cars'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <h4 className='categotyItemHeader'>Cars</h4>
            <p className='categoryItemPgh'>(50) ads</p>
        </div>
    )
}

export default CategoryItem