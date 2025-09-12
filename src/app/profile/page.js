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
import Link from 'next/link'

import { AuthContext } from '../../../context/authContext';
import Loading from '@/loading'
import { logout } from '../../../actions/auth';

export default function SideMenu() {

  const { isUser, isLoading } = React.useContext(AuthContext)


  const [authState, setAuthState] = React.useState({ user: null, loading: true });


  React.useEffect(() => {
    setAuthState({ user: isUser, loading: isLoading === "loading" });
  }, [isUser, isLoading]);

  console.log("Auth state:", { isUser, isLoading, authState }); // Debug log

  if (authState.loading) return (<Loading />)


  return (

    <div className="sideMenuDiv height d-flex">
      <div>
        {authState.user ? (

          <header className='sideMenuHeader padding d-flex'>
            <h3 className='subtitle1'>{`Welcome, ${authState.user.name || 'User'}`}</h3>
            <p className='text1'>{authState.user.email || 'No email'}</p>
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


      {authState.user &&
        <h3 onClick={() => logout()} className='padding subtitle2 logoutHeader d-flex cursor'>
          Logout
        </h3>
      }
    </div>

  )
}
