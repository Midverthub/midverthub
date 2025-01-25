'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

// import Contact from '@/components/contact';
// import AdvertItem from '@/components/advertItem';
import ProductLandscape from '@/components/productLandscape';
import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import Loading from '@/loading';
import Redirect from '../../../hooks/redirect';

import Alert from '@/components/alert';

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure"
}


export default function SavedItems() {
  const { redirectFunc } = Redirect()

  redirectFunc()


  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  const [productData, setProductData] = React.useState([])
  const [savedId, setSavedId] = React.useState([])
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)

  const [showOverlay, setShowOverlay] = React.useState(false)
  const [toBeDeleted, setToBeDeleted] = React.useState()

  const [alertText, setAlertText] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)

  const [loadingMini, setLoadingMini] = React.useState(false)


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

  async function deleteAd() {
    // console.log(toBeDeleted);

    try {
      setLoadingMini(true)
      const res = await fetch(`/api/saved/${isUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: isUser.id,
          productId: toBeDeleted.productId,
          savedId: toBeDeleted.id
        })
      })

      if (res.status === 200) {
        fetchData().then(() => {

          setShowOverlay(false)
          setLoadingMini(false)
          setAlertText('Saved Ad deleted successfully')
          setShowAlert(true)
          setToBeDeleted()
        })
      }

    } catch (error) {
      setShowOverlay(false)
      setLoadingMini(false)
      setAlertText('Error deleting Saved Ad')
      setShowAlert(true)
      setToBeDeleted()
      // fetchData()
      // console.log(error);
    }

  }

  function deleteBtnFunc(e, saved) {
    // console.log(saved);
    setShowOverlay(true)
    setToBeDeleted(saved)

    // deleteAd(data)
  }



  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)

  // if (!isUser) return (
  //   <div className='margin-t-b advertLinkDiv d-flex'>
  //     <p className='subtitle1'> Login to save an item</p>

  //     <Link className='link' href='/login'>
  //       <button className='advertLinkBtn d-flex'>
  //         <p className='subtitle1'>
  //           Continue to Login
  //         </p>
  //         {/* <FontAwesomeIcon icon={faHome} className="iconSize2" /> */}
  //       </button>
  //     </Link>

  //   </div>
  // )


  return (

    <div className="height advertsDiv margin-t-b">

      {showAlert && <Alert text={alertText} />}
      {
        showOverlay &&
        <div className='deleteDialogBacKgroud d-flex'>
          <div className='d-flex deleteDialogDiv'>
            <h3 className='deleteDialogHeader'>Delete Advert</h3>
            {
              !loadingMini ?
                <p className='deleteDialogText'>Are you sure you want to delete this ad?</p>
                :
                <p className='deleteDialogText'>Deleting......</p>
            }

            <div className='deleteDialogBtnDiv d-flex'>
              {!loadingMini &&
                <button
                  onClick={() => setShowOverlay(false)}
                  className='deleteDialogBtn1'
                >Cancel</button>
              }

              <button
                onClick={() => { deleteAd() }}
                className='deleteDialogBtn2'>
                {
                  loadingMini ?
                    <Image
                      width={18}
                      height={18}
                      src={"/assets/loadingTwo.svg"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt='Save'
                      style={{ objectFit: 'contain' }}
                    // onClick={() => saveProduct()}
                    /> : "Delete"
                }
              </button>
            </div>
          </div>

        </div>
      }

      {productData.length !== 0 ? (

        <div className='verticalContainer margin-t-b d-flex'>


          {
            productData.map((product, index) => {
              const saved = savedId[index];

              // console.log(product);
              return (
                // <Link className='link' key={index} href={`/products/${product.id}`}>
                <ProductLandscape key={index} user={isUser} data={product} saved={saved} deleteBtn={deleteBtnFunc} />
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
