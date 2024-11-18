'use client'

import Link from "next/link"

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="container loading">
                <h2 className='subtitle2'>Something went wrong!</h2>
                <Link href="/" >
                    <button
                        className='mainProductButton2 btn'
                    >
                        Go Back Home
                    </button>
                </Link>
            </body>
        </html>
    )
}