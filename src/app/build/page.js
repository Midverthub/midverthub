'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-brands-svg-icons';


import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {


  return (

    <div className="formDiv d-flex">
      <div>
        <FontAwesomeIcon icon={faCheck} className='iconSize2' />
      </div>

      <div>
        {/* <FontAwesomeIcon icon={faGoogle} className='iconSize2' /> */}
        <h3>Sign Up Completed</h3>
        <p>Start buying and selling now!</p>
      </div>

      <button className='otherSignUpBtn d-flex'>
        contine Shopping
      </button>

    </div>

  )
}
