"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image'
import Link from 'next/link'

export default function Reshuffle() {

    return (

        <div className=" manualReshuffleDiv margin-t-b">

            <div className='reshuffleManualImg'>
                <Image
                    fill
                    src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='no rating'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <div className='manualReshuffleInfoDiv margin-t-b'>

                <div className=' manualReshuffleDiv1 padding d-flex'>
                    <div className='manualReshuffleDiv1Inner d-flex'>
                        <h3 className='subtitle1'>Samsung Galaxy S21 Ultra - 128GB
                            Phantom Black</h3>
                        <h3 className='subtitle1'>#15,000,000</h3>
                    </div>

                    <p className='text1'>
                        All items displayed are readily available to customers within Ajika, Lagos Nigeria
                        and can be delivered once order is  confirmed
                    </p>
                </div>

                <div className=' manualReshuffleDiv1 d-flex padding'>
                    <h3 className='subtitle1'>Boost you Ads Now</h3>

                    <p className='text1'>
                        Keep your ads fresh and at the forefront of our classified
                        listings with our Manual Update feature. Manually reshuffle
                        your ads every 6 hours to maximize visibility and attract more
                        potential buyers.
                    </p>
                    <Link className='link' href='/reShuffle/manualPlan/manualPlanAd'>
                        <button className='btn subtitle1 margin-t-b reShuffleManualBtn'>Watch video now</button>
                    </Link>
                </div>
            </div>


        </div>

    )
}
