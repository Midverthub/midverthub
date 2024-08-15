import React from 'react'
import Category from '@/components/category'
import Image from 'next/image'

function Categories() {
    return (
        <div className='categories'>
            <div className='sellDiv d-flex'>
                <Image
                    src="/assets/sell.svg"
                    width="16"
                    height="16"
                    alt="loading"

                />
                Sell
            </div>
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
        </div>
    )
}

export default Categories