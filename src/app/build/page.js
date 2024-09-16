'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';





import Image from 'next/image'
import Link from 'next/link'

export default function Build() {


  return (

    <div className="sideMenuDiv height d-flex">
      <div>
        <header className='sideMenuHeader padding d-flex'>
          <h3 className='subtitle1'>{`Welcome, ${'John Doe'}`}</h3>
          <p className='text1'>johndoe@gmail.com</p>
        </header>

        <p className='text1 padding'>My Account</p>

        <div className='sideMenuOptionsDiv padding-t-b d-flex'>
          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faBullhorn} className='iconSize2' />
            <h4 className='subtitle1'>My Adverts</h4>
          </div>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faUser} className='iconSize2' />
            <h4 className='subtitle1'>Follows & Followers</h4>
          </div>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faBell} className='iconSize2' />
            <h4 className='subtitle1'>Notifications</h4>
          </div>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faListCheck} className='iconSize2' />
            <h4 className='subtitle1'>Saved Items</h4>
          </div>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faGear} className='iconSize2' />
            <h4 className='subtitle1'>Settings</h4>
          </div>
        </div>

        <p className='text1 padding'>My Profile</p>

        <div className='sideMenuOptionsDiv padding-t-b d-flex'>
          <div className='sideMenuOptionProfile padding-l-r d-flex'>
            <h4 className='subtitle1'>Account Management</h4>
            <FontAwesomeIcon icon={faAngleRight} className='iconSize2' />
          </div>

          <div className='sideMenuOptionProfile padding-l-r d-flex'>
            <h4 className='subtitle1'>Close Account</h4>
            <FontAwesomeIcon icon={faAngleRight} className='iconSize2' />
          </div>

        </div>
      </div>



      <h3 className='padding subtitle2 logoutHeader d-flex'>
        Logout
      </h3>
    </div>

  )
}
