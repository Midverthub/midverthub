'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='container loading'>
            <h2 className='subtitle2'>Something went wrong!</h2>
            <Link href="/" >
                <button
                    className='mainProductButton2 btn'
                >
                    Go Back Home
                </button>
            </Link>
        </div>
    )
}