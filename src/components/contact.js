import React from 'react'

import Image from 'next/image'

function Contact() {
    return (
        <div className='contactDiv padding-l-r  d-flex'>
            <div className='contactUserImgDiv'>
                <Image
                    width={50}
                    height={51}
                    src={"/assets/userProfileImg.jpeg"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Userprofile image'
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className='contactInnerdiv d-flex'>
                <div className='contactInfoDiv '>
                    <h3 className='subtitle3'> John Doe</h3>
                    <p className='text1'> Key stone plug</p>
                </div>

                <button className=' text1'>Remove</button>
            </div>

        </div>
    )
}

export default Contact