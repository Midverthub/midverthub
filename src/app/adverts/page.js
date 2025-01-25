"use client"

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import AdvertItem from '@/components/advertItem';

import { AuthContext } from '../../../context/authContext';
import axios from 'axios';
import Redirect from '../../../hooks/redirect';
import Loading from '@/loading';

import Alert from '@/components/alert';

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
  const [productData, setProductData] = React.useState([]);
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
  const [showOverlay, setShowOverlay] = React.useState(false)
  const [toBeDeleted, setToBeDeleted] = React.useState()

  const [alertText, setAlertText] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)

  const [loadingMini, setLoadingMini] = React.useState(false)

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

  async function deleteAd() {
    // console.log(toBeDeleted);
    try {
      setLoadingMini(true)
      const res = await fetch(`/api/products/${toBeDeleted.id}?userId=${isUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (res.status === 200) {
        fetchData().then(() => {

          setShowOverlay(false)
          setLoadingMini(false)
          setAlertText('Advert deleted successfully')
          setShowAlert(true)
          setToBeDeleted()
        })
      }

    } catch (error) {
      setShowOverlay(false)
      setLoadingMini(false)
      setAlertText('Error deleting advert')
      setShowAlert(true)
      setToBeDeleted()
      // fetchData()
      // console.log(error);
    }

  }

  function deleteBtnFunc(e, data) {
    // console.log(data);
    setShowOverlay(true)
    setToBeDeleted(data)

    // deleteAd(data)
  }


  if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)



  return (

    <div className="advertsDiv">
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
        <div className='advertsContainer margin-t-b d-flex'>

          {
            [...productData].reverse().map((product, index) => {
              return (
                <AdvertItem key={index} data={product} deleteBtn={deleteBtnFunc} />
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
