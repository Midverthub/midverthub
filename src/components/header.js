import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
    return (
        <header className='header d-flex'>
            <Link href={"/"}>
                <Image
                    src="/assets/logo.svg"
                    width="68"
                    height="25"
                    alt="loading"

                />
            </Link>

            <Link href={"/signup"}>
                <button className='sign-up-btn'>Sign Up</button>
            </Link>
        </header>
    )
}

export default Header