"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image'
import Link from 'next/link'

export default function Reshuffle() {

    return (

        <div className="manualReshuffleAdDiv height d-flex ">
            <div>


                <div className='manualReshuffleAdInnerDiv padding-t-b '>

                    <h3 className='subtitle2'>
                        Manual Updating
                    </h3>

                    <video width="372" height="196" controls poster="/assets/advertposter.jpg" preload="none" className='margin-t-b'>
                        <source src="/assets/vid.mp4" type="video/mp4" />
                        {/* <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    /> */}
                        Your browser does not support the video tag.
                    </video>
                </div>


                <div className='PreviousRatings padding-l-r d-flex'>

                    <div className='PreviousRatingsInnerDiv d-flex'>
                        <div className='PreviousRatingsImg'></div>
                        <div className='PreviousRatingsInfo d-flex'>
                            <h3 className='PreviousRatingsName'>John Doe</h3>
                            <p className='PreviousRatingsDetails'>All items displayed are readily available to customers within Ajika, Lagos Nigeria </p>
                        </div>
                    </div>
                    <h5 className='PreviousRatingsMore'>{"View seller profile"}</h5>
                </div>
            </div>


            <button className='btn subtitle1 d-flex margin-l-r manualReshuffleAdBtn '>Done</button>

        </div>

    )
}
