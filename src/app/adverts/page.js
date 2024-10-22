

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import Contact from '@/components/contact';
import AdvertItem from '@/components/advertItem';

export default function Contacts() {


  return (

    <div className="height advertsDiv">


      <div className='advertsContainer margin-t-b d-flex'>
        <AdvertItem />

      </div>

      <div className='advertLinkDiv d-flex'>
        <p className='subtitle1'> No advert here .....</p>

        <Link className='link' href='/'>
          <button className='advertLinkBtn d-flex'>
            <p className='subtitle1'>
              Go Home
            </p>
            <FontAwesomeIcon icon={faHome} className="iconSize2" />
          </button>
        </Link>

      </div>




    </div>

  )
}
