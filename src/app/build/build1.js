'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {


  return (

    <div className="signupCofirmDiv d-flex">
      <div className='signupCofirmbg d-flex'>
        <FontAwesomeIcon icon={faCheck} className='checkmark' />
      </div>

      <div className='signupCofirmInfo d-flex'>
        <h3 className='signupCofirmInHeader'>Sign Up Completed</h3>
        <p className='signupCofirmPgh'>Start buying and selling now!</p>
      </div>

      <button className=' signupCofirmBtn d-flex'>
        contine Shopping
      </button>

      <div className='footerExtraDiv d-flex'>
        <button className='backToTopBtn'>
          Back to Top
        </button>

        <div className='footerExtraInfo d-flex'>
          <div className='footerExtraInfoInnerDiv d-flex'>
            <p className='footerExtraInfoPgh'>Chat with us</p>
            <p className='footerExtraInfoPgh'>Help center</p>
            <p className='footerExtraInfoPgh'>Contact Us</p>
            <p className='footerExtraInfoPgh'>Terms & Conditions</p>
          </div>

          <p className='footerExtraInfoPgh2'>Report a Product</p>

          <div className='lineDiv'></div>

          <p className='footerExtraInfoPgh2'>All rights Reserved</p>
        </div >
      </div>

    </div>

  )
}
