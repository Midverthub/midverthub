import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
    return (
        <footer className='footer d-flex'>
            <Link className='link' href={'/'}>
                <div className='footerItems'>
                    <Image
                        width={24}
                        height={24}
                        src="/assets/iconhome.svg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt='Home'
                        style={{ objectFit: 'contain' }}

                    />
                    <h3 className='footerHeader'>Home</h3>
                </div>
            </Link>

            <Link className='link' href={'/savedItems'}>

                <div className='footerItems'>
                    <Image
                        width={24}
                        height={24}
                        src="/assets/iconsave.svg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt='Saved'
                        style={{ objectFit: 'contain' }}

                    />
                    <h3 className='footerHeader'>Saved</h3>
                </div>
            </Link>

            <Link className='link' href={'/upload'}>
                <div className='footerItems'>
                    <Image
                        width={24}
                        height={24}
                        src="/assets/iconsell.svg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt='Sell'
                        style={{ objectFit: 'contain' }}

                    />
                    <h3 className='footerHeader'>Sell</h3>
                </div>
            </Link>


            <div className='footerItems'>
                <Image
                    width={24}
                    height={24}
                    src="/assets/iconmessage.svg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='messages'
                    style={{ objectFit: 'contain' }}

                />
                <h3 className='footerHeader'>Messages</h3>
            </div>

            <Link className='link' href={'/profile'}>
                <div className='footerItems'>
                    <Image
                        width={24}
                        height={24}
                        src="/assets/iconprofile.svg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt='profile'
                        style={{ objectFit: 'contain' }}

                    />
                    <h3 className='footerHeader'>Profile</h3>
                </div>
            </Link>

        </footer>
    )
}

export default Footer