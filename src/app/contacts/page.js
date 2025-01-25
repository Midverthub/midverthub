"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link'
import Contact from '@/components/contact';

import { AuthContext } from '../../../context/authContext';
import axios from 'axios'
import Loading from '@/loading';
import Redirect from '../../../hooks/redirect';
import Alert from '@/components/alert';
import { set } from 'mongoose';

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}

export default function Contacts() {
  const { redirectFunc } = Redirect()

  redirectFunc()

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  const [productData, setProductData] = React.useState(null)
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
  const [toShow, setToShow] = React.useState(false)


  const [alertText, setAlertText] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)

  const [loadingMini, setLoadingMini] = React.useState(false)

  async function fetchData() {
    try {
      const result = await axios.get(`/api/contacts?userId=${isUser.id}`);
      setProductData(result.data.data);
      setRequestStatus(REQUEST_STATUS.SUCCESS)

    } catch (error) {
      setRequestStatus(REQUEST_STATUS.FAILURE)

      console.error('Error fetching product data:', error);
    }
  }

  React.useEffect(() => {
    if (showAlert) {

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);


  React.useEffect(() => {
    if (isUser && isUser.id) {
      setRequestStatus(REQUEST_STATUS.LOADING)

      async function fetchData() {
        try {
          const result = await axios.get(`/api/contacts?userId=${isUser.id}`);
          setProductData(result.data.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS)

        } catch (error) {
          setRequestStatus(REQUEST_STATUS.FAILURE)

          console.error('Error fetching product data:', error);
        }
      }
      fetchData();
    }
  }, [isUser])
  // console.log(productData);

  async function unfollow(id) {

    try {
      setLoadingMini(true)
      const res = await fetch(`/api/contacts/${isUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: isUser.id, followId: id })
      })

      if (res.status === 200) {
        // console.log("contact unfollowed successfully");
        // console.log(await res.json());
        fetchData().finally(() => {
          setLoadingMini(false)
          setAlertText('Contact unfollowed successfully')
          setShowAlert(true)
        })
      }

    } catch (error) {
      // console.log(error);
      setLoadingMini(false)
      setAlertText('Error unfollowing contact')
      setShowAlert(true)
    }
  }

  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)



  return (

    <div className=" contactsDiv">
      {showAlert && <Alert text={alertText} />}

      <div className='contactsInnerDiv d-flex'>
        <h4 className={`contactFollowpgh d-flex cursor subtitle3 ${!toShow && 'active'} `} onClick={() => { setToShow(false) }}>Followers ({productData.followers.length})</h4>
        <h4 className={`contactFollowpgh cursor d-flex subtitle3 ${toShow && 'active'} `} onClick={() => { setToShow(true) }}>Following ({productData.following.length})</h4>
      </div>




      <div className='contactsContainer margin-t-b d-flex'>
        {toShow ?
          productData.following.length === 0 ? <p className='subtitle1 contactLinkDiv d-flex'> You are not following anyone</p> :
            productData.following.map((contact) => {
              return <Contact key={contact.id} contact={contact} unfollow={unfollow} loadingMini={loadingMini} />
            })
          :
          productData.followers.length === 0 ? <p className='subtitle1 contactLinkDiv d-flex'>No one is following you</p> :
            productData.followers.map((contact) => {
              return <Contact key={contact.id} contact={contact} unfollow={unfollow} loadingMini={loadingMini} />
            })}



        {/* <Contact />
        <Contact />
        <Contact />
        <Contact /> */}
      </div>



      {/* <div className='contactLinkDiv d-flex'>
        <p className='subtitle1'> Invite someone</p>

        <button className='contactLinkBtn d-flex'>
          <p className='subtitle1'>
            Generate Link
          </p>
          <FontAwesomeIcon icon={faLink} className="iconSize2" />
        </button>

      </div> */}

    </div>

  )
}
