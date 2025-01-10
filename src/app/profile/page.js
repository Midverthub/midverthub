'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import { AuthContext } from '../../../context/authContext';
import Loading from '@/loading'
import { logout } from '../../../actions/auth';

export default function SideMenu() {

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);

  if (isLoading === "loading") return (<Loading />)


  return (

    <div className="sideMenuDiv height d-flex">
      <div>
        {isUser ? (

          <header className='sideMenuHeader padding d-flex'>
            <h3 className='subtitle1'>{`Welcome, ${isUser.name}`}</h3>
            <p className='text1'>{isUser.email}</p>
          </header>
        ) : (
          <header className='sideMenuHeader padding d-flex'>
            <h3 className='subtitle1'>Welcome, Guest</h3>
            <p className='text1'>Sign in to access your account</p>
          </header>
        )}

        <p className='text1 padding'>My Account</p>

        <div className='sideMenuOptionsDiv padding-t-b d-flex'>
          <Link className='link' href='/adverts'>
            <div className='sideMenuOption padding-l-r d-flex'>
              <FontAwesomeIcon icon={faBullhorn} className='iconSize2' />
              <h4 className='subtitle1'>My Adverts</h4>
            </div>
          </Link>

          <Link className='link' href='/contacts'>
            <div className='sideMenuOption padding-l-r d-flex'>
              <FontAwesomeIcon icon={faUser} className='iconSize2' />
              <h4 className='subtitle1'>Contacts</h4>
            </div>
          </Link>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faBell} className='iconSize2' />
            <h4 className='subtitle1'>Notifications</h4>
          </div>

          <Link className='link' href='/rating'>
            <div className='sideMenuOption padding-l-r d-flex'>
              <FontAwesomeIcon icon={faCheck} className='iconSize2' />
              <h4 className='subtitle1'>Reviews</h4>
            </div>
          </Link>

          <Link className='link' href='/savedItems'>
            <div className='sideMenuOption padding-l-r d-flex'>
              <FontAwesomeIcon icon={faListCheck} className='iconSize2' />
              <h4 className='subtitle1'>Saved Items</h4>
            </div>
          </Link>

          <div className='sideMenuOption padding-l-r d-flex'>
            <FontAwesomeIcon icon={faGear} className='iconSize2' />
            <h4 className='subtitle1'>Settings</h4>
          </div>
        </div>

        <p className='text1 padding'>My Profile</p>

        <div className='sideMenuOptionsDiv padding-t-b d-flex'>
          {/* <Link className='link' href='/userProfile'> */}
          <div className='sideMenuOptionProfile padding-l-r d-flex'>
            <h4 className='subtitle1'>Account Management</h4>
            <FontAwesomeIcon icon={faAngleRight} className='iconSize2' />
          </div>
          {/* </Link> */}

          <div className='sideMenuOptionProfile padding-l-r d-flex'>
            <h4 className='subtitle1'>Close Account</h4>
            <FontAwesomeIcon icon={faAngleRight} className='iconSize2' />
          </div>

        </div>
      </div>


      {isUser &&
        <h3 onClick={() => logout()} className='padding subtitle2 logoutHeader d-flex'>
          Logout
        </h3>
      }
    </div>

  )
}
