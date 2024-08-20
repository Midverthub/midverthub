import React from 'react'
import Image from 'next/image'

function Header() {
    return (
        <header className='header d-flex'>
            <Image
                src="/assets/logo.svg"
                width="68"
                height="25"
                alt="loading"

            />

            <button className='sign-up-btn'>Sign Up</button>
        </header>
    )
}

export default Header