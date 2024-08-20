'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='error-div'>
            <h2 className='title layout-about-title'>Something went wrong!</h2>
            <Link href="/" >
                <button
                    className='header-btn product-btn'
                >
                    Go Back Home
                </button>
            </Link>
        </div>
    )
}