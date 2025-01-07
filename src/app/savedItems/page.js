'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// import Image from 'next/image'
import Link from 'next/link'

// import Contact from '@/components/contact';
// import AdvertItem from '@/components/advertItem';
import ProductLandscape from '@/components/productLandscape';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import Loading from '@/loading';

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}


export default function SavedItems() {


  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  const [productData, setProductData] = React.useState([])
  const [savedId, setSavedId] = React.useState([])
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


  React.useEffect(() => {
    if (isUser && isUser.id) {
      setRequestStatus(REQUEST_STATUS.LOADING)
      async function fetchData() {
        try {
          const result = await axios.get(`/api/saved/${isUser.id}`)
          // console.log(result.data.data);
          setSavedId(result.data.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS)



          let productArray = [];
          if (result.data.data.length !== 0) {
            const result2 = async () => {
              await Promise.all(result.data.data.map(async (product, index) => {
                // console.log(product.productId);
                const res = await axios.get(`/api/products/${product.productId}?userId=${isUser.id}`)
                // console.log(res.data);
                productArray.push(res.data.data);
                // setProductData(prev => {
                //   return [...prev, res.data.data]
                // })
              }));
            }
            await result2();
            // console.log(productArray);
            setProductData(productArray);
            setRequestStatus(REQUEST_STATUS.SUCCESS)

          }
          else {
            setProductData([]);
          }
        } catch (error) {
          setRequestStatus(REQUEST_STATUS.FAILURE)
          console.error('Error fetching product data:', error);
        }
      }
      fetchData();
    } else {
      setRequestStatus(REQUEST_STATUS.SUCCESS)
      setProductData([]);
    }
  }, [isUser])
  // console.log(productData);

  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)

  if (!isUser) return (
    <div className='margin-t-b advertLinkDiv d-flex'>
      <p className='subtitle1'> Login to save an item</p>

      <Link className='link' href='/login'>
        <button className='advertLinkBtn d-flex'>
          <p className='subtitle1'>
            Continue to Login
          </p>
          {/* <FontAwesomeIcon icon={faHome} className="iconSize2" /> */}
        </button>
      </Link>

    </div>
  )


  return (

    <div className="height advertsDiv margin-t-b">

      {productData.length !== 0 ? (

        <div className='verticalContainer margin-t-b d-flex'>
          {
            productData.map((product, index) => {
              const saved = savedId[index];

              // console.log(product);
              return (
                // <Link className='link' key={index} href={`/products/${product.id}`}>
                <ProductLandscape key={index} user={isUser} data={product} saved={saved} />
                // </Link>
              )

            })
          }
          {/* <ProductLandscape /> */}
          {/* <ProductLandscape /> */}


        </div>
      ) : (
        <div className='advertLinkDiv d-flex'>
          <p className='subtitle1'> No saved item .....</p>

          <Link className='link' href='/'>
            <button className='advertLinkBtn d-flex'>
              <p className='subtitle1'>
                Continue Shopping
              </p>
              <FontAwesomeIcon icon={faHome} className="iconSize2" />
            </button>
          </Link>

        </div>
      )}




    </div>

  )
}
