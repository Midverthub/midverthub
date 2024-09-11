'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'
import ItemToRate from '@/components/itemToRate';

export default function Rating() {


  return (

    <div className="height ratingDiv">
      {/* <div className='ratingInnerDiv d-flex padding'>
        <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

        <h3 className='ratingHeader' >Pending Rating</h3>
      </div> */}

      <div className='ratingInnerDiv-1 margin-t-b d-flex'>
        <div className='noRatingImgDiv'>
          <Image
            fill
            src="/assets/notFoundImg.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='no rating'
            style={{ objectFit: 'contain' }}

          />
        </div>

        <p className='noRatingPgh'>You dont have any Pending Rating</p>

      </div>

      <div className='itemsToRateDiv d-flex'>

        <ItemToRate />
        <ItemToRate />
      </div>
      {/* <ItemToRate /> */}

    </div>

  )
}
