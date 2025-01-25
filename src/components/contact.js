"use client"
import React from 'react'

import Image from 'next/image'

function Contact({ contact, unfollow, loadingMini }) {
    // console.log(contact);
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
                    <h3 className='subtitle3'> {(contact.following ? contact.following : contact.follower).name}</h3>
                    {/* <p className='text1'> Key stone plug</p> */}
                </div>

                {contact.following && <button onClick={() => unfollow(contact.id)} className=' text1 cursor'>
                    {
                        loadingMini ?
                            <Image
                                width={18}
                                height={18}
                                src={"/assets/loadingTwo.svg"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt='Save'
                                style={{ objectFit: 'contain' }}
                            // onClick={() => saveProduct()}
                            /> : "Unfollow"
                    }
                </button>}
            </div>

        </div>
    )
}

export default Contact