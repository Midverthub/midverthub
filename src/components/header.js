import React from 'react'
import Image from 'next/image'

function Header() {
    return (
        <div className='header d-flex'>
            <Image
                src="/assets/logo.svg"
                width="68"
                height="25"
                alt="loading"

            />

            <button className='sign-up-btn'>Sign Up</button>
        </div>
    )
}

export default Header