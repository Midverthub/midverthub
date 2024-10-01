

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import Contact from '@/components/contact';
import AdvertItem from '@/components/advertItem';
import ProductLandscape from '@/components/productLandscape';

export default function SavedItems() {


  return (

    <div className="height advertsDiv margin-t-b">


      <div className='verticalContainer margin-t-b d-flex'>
        <ProductLandscape />
        <ProductLandscape />


      </div>

      <div className='advertLinkDiv d-flex'>
        <p className='subtitle1'> No saved item .....</p>

        <button className='advertLinkBtn d-flex'>
          <p className='subtitle1'>
            Continue Shopping
          </p>
          <FontAwesomeIcon icon={faHome} className="iconSize2" />
        </button>

      </div>




    </div>

  )
}
