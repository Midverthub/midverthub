"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link'
import Contact from '@/components/contact';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { ProductContext } from '../../../context/productContext';
import { AuthContext } from '../../../context/authContext';
import Loading from '@/loading';
import Redirect from '../../../hooks/redirect';

import Alert from '@/components/alert';

export default function Reshuffle() {
  const { redirectFunc } = Redirect()

  redirectFunc()

  const router = useRouter()

  const { isProduct, setProduct } = React.useContext(ProductContext)
  // console.log(isProduct);

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);

  const [alertText, setAlertText] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)

  const [loadingMini, setLoadingMini] = React.useState(false)

  React.useEffect(() => {
    if (showAlert) {

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  async function subscribe(plan) {
    try {
      setLoadingMini(true)
      // const result = await axios.get(`/api/paidAd`);
      // console.log(result.data.data);
      // const resOut = result.data.data.filter(obj => obj.id === isProduct.paidAdvert.id);
      // console.log(resOut);

      if (isProduct.paidAdvert !== null) {
        setLoadingMini(false)
        setAlertText('Advert is already on a paid plan')
        setShowAlert(true)
        return
      } else {


        const res = await fetch(`/api/paidAd/${isUser.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: isUser.id,
            productId: isProduct.id,
            subscription: plan
          })
        })


        if (res.status === 200) {
          setLoadingMini(false)
          setAlertText('Reshuffle successfully')
          setShowAlert(true)

          setTimeout(() => {
            router.push(`/adverts`);
          }, 5000);
          // console.log("subscribed successfully");
          // console.log(await res.json());
        }

        if (res.status === 500) {
          setLoadingMini(false)
          setAlertText('Error Reshuffling Advert')
          setShowAlert(true)
          // console.log("error subscribing");
          // console.log(await res.json());

        }
      }


    } catch (error) {
      setLoadingMini(false)
      setAlertText('Error Reshuffling Advert')
      setShowAlert(true)
      // console.log(error);
    }
  }

  if (isLoading === "loading") return (<Loading />)



  return (

    <div className="height reshuffleDiv d-flex margin-t-b">
      {showAlert && <Alert text={alertText} />}

      <div className='reshuffleHeroDiv padding d-flex'>
        <div className='reshuffleHeroImgDiv'>
          <Image
            fill
            src={isProduct.images[0]}
            // src="/assets/reshuffleHeroImg.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='reshuffle'
            style={{ objectFit: 'contain' }}
          // style={{ objectFit: 'cover', backgroundColor: 'black' }}

          />
        </div>


        <h3 className='subtitle3'>
          MidVert Reshuffle Plan
        </h3>

        <p className='text2'>
          Gain more visibility  with 4 reshuffle chances every 6 hours . click on the preferred option below
        </p>

      </div>

      <div className='manualPlanDiv padding  d-flex'>

        <div className='manualPlanDivInner d-flex'>
          <div className='reshuffleManualImgDiv'>
            <Image
              fill
              src="/assets/reshuffleManualImg.png"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt='no rating'
              style={{ objectFit: 'cover' }}

            />
          </div>

          <div className='manualPlanInfoDiv d-flex'>
            <h3 className='subtitle3'>
              MidVert Manual Plan
            </h3>

            <p className='text1'>
              Not satisfied with the 6 hours interval and want even more ad reshuffle chances within 24 hours?
              Subscribe below to a premium plan,
              gain more product visibility and let ad updates be done automatically for you.
            </p>
          </div>

        </div>
        <Link className='link' href='reShuffle/manualPlan'>
          <button className='btn manualBtn cursor'>
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
                /> : "Try Free Manual Reshuffle Plan"
            }



          </button>
        </Link>

      </div>

      <div className='paidPlanDiv padding d-flex'>

        <div className='paidPlanInnerDiv d-flex'>
          <div className='paidPlanInnerDiv1 d-flex'>
            <div className='reshufflePaidImg'>
              <Image
                fill
                src="/assets/reshufflePaidImg.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='no rating'
                style={{ objectFit: 'contain' }}

              />
            </div>

            <h3 className='subtitle2'>Pro Package</h3>
          </div>

          <h3 className='subtitle2'>₦ 5,000</h3>
        </div>

        <p className='text1'>
          Enjoy automatic reshuffle every 4 hours with 6 reshuffle
          chances that guarantees more visibility within 24 hour.
        </p>

        <div className='paidPlanDetailsDiv d-flex'>
          <h3 className='subtitle2'>30 Days</h3>

          <button onClick={() => { subscribe("pro package") }} className='btn paidPlanDetailsBtn cursor'>
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
                /> : "Reshuffle now"
            }
          </button>
        </div>
      </div>

      <div className='paidPlanDiv padding d-flex'>

        <div className='paidPlanInnerDiv d-flex'>
          <div className='paidPlanInnerDiv1 d-flex'>
            <div className='reshufflePaidImg'>
              <Image
                fill
                src="/assets/reshufflePaidImg.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='no rating'
                style={{ objectFit: 'contain' }}

              />
            </div>

            <h3 className='subtitle2'>Plus Package</h3>
          </div>

          <h3 className='subtitle2'>₦ 8,000</h3>
        </div>

        <p className='text1'>
          Enjoy automatic reshuffle every 2 hours with 12 reshuffle
          chances that guarantees more visibility within 24 hour.
        </p>

        <div className='paidPlanDetailsDiv d-flex'>
          <h3 className='subtitle2'>30 Days</h3>

          <button onClick={() => { subscribe("pro plus package") }} className='d-flex btn paidPlanDetailsBtn cursor'>
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
                /> : "Reshuffle now"
            }
          </button>
        </div>
      </div>


    </div>

  )
}
