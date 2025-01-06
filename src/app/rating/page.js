'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'
import ItemToRate from '@/components/itemToRate';

import { AuthContext } from '../../../context/authContext';
import Loading from '@/loading'
import axios from 'axios'

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}

export default function Rating() {

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  const [productData, setProductData] = React.useState([])
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


  React.useEffect(() => {
    if (isUser && isUser.id) {
      setRequestStatus(REQUEST_STATUS.LOADING)
      async function fetchData() {
        try {
          const result = await axios.get(`/api/ratings/${isUser.id}?userId=${isUser.id}`);
          // setProductData(result.data.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS)
          // console.log(result.data.data);
        } catch (error) {
          setRequestStatus(REQUEST_STATUS.FAILURE)
          console.error('Error fetching product data:', error);
        }
      }
      fetchData();
    }
  }, [isUser,])
  // console.log(productData);


  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)



  return (

    <div className="height ratingDiv">

      {
        productData.length === 0 ? (

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

            <p className='noRatingPgh'>You dont have any Pending Rating</p>

          </div>
        ) : (


          <div className='itemsToRateDiv d-flex'>
            {
              productData.map((item, index) => (
                <Link className='links' key={index} href={`/rating/${item.id}`}>
                  <ItemToRate data={item} />
                </Link>
              ))}

            {/* <Link className='links' href="/rating/1">
              <ItemToRate />
            </Link> */}

            {/* <Link className='links' href="/rating/1">
              <ItemToRate />
            </Link> */}
          </div>
        )}
      {/* <ItemToRate /> */}

    </div>

  )
}
