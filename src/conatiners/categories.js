import React from 'react'
import Category from '@/components/category'
import Image from 'next/image'
import Link from 'next/link'

function Categories() {
    return (
        <div className='categories'>
            <Link className='link' href={'/upload'}>
                <div className='sellDiv d-flex'>
                    <Image
                        src="/assets/sell.svg"
                        width="16"
                        height="16"
                        alt="loading"

                    />
                    Sell
                </div>
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>

            <Link className='link' href={'/categories'}>
                <Category />
            </Link>
        </div>
    )
}

export default Categories