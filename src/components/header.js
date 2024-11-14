
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { auth } from '@/auth'
import { auth } from '../../auth'
import { logout } from '../../actions/auth'
import Logout from './logout'

async function Header() {
    const session = await auth()
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
            {
                !session?.user ? (
                    <Link href={"/signup"}>
                        <button className='sign-up-btn'>Login</button>
                    </Link>
                ) : (
                    <Logout />
                )
            }


        </header>
    )
}

export default Header