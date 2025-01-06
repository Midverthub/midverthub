"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import Contact from '@/components/contact';
import AdvertItem from '@/components/advertItem';

import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import Loading from '@/loading';

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}

export default function Contacts() {

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  const [productData, setProductData] = React.useState([])
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


  React.useEffect(() => {
    if (isUser && isUser.id) {
      setRequestStatus(REQUEST_STATUS.LOADING)
      async function fetchData() {
        try {
          const result = await axios.get(`/api/products?userId=${isUser.id}`);
          setProductData(result.data.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS)
          // console.log(result.data);
        } catch (error) {
          setRequestStatus(REQUEST_STATUS.FAILURE)
          console.error('Error fetching product data:', error);
        }
      }
      fetchData();
    }
  }, [isUser])
  // console.log(productData);


  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)



  return (

    <div className="advertsDiv">

      {productData.length !== 0 ? (


        <div className='advertsContainer margin-t-b d-flex'>
          {
            productData.map((product, index) => {
              return (
                <AdvertItem key={index} data={product} />
              )
            })
          }
        </div>
      ) : (
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
      )}




    </div>

  )
}
