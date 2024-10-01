'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'
import ItemToRate from '@/components/itemToRate';
import Product from '@/components/product';
import ProductLandscape from '@/components/productLandscape';

export default function Rating() {


  return (

    <div className="height ratingDiv">
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

        <p className='noRatingPgh'>No recently viewed product(s)</p>

      </div>

      <div className='verticalContainer padding-t-b d-flex'>
        <ProductLandscape />
        <ProductLandscape />
        <ProductLandscape />
        <ProductLandscape />
        <ProductLandscape />
        <ProductLandscape />
        <ProductLandscape />

      </div>
      {/* <ItemToRate /> */}

    </div>

  )
}
