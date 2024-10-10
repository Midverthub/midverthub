import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import Link from 'next/link'
import Contact from '@/components/contact';

export default function Reshuffle() {


  return (

    <div className="height reshuffleDiv d-flex margin-t-b">

      <div className='reshuffleHeroDiv padding d-flex'>
        <div className='reshuffleHeroImgDiv'>
          <Image
            fill
            src="/assets/reshuffleHeroImg.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='reshuffle'
            style={{ objectFit: 'contain' }}

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

        <button className='btn manualBtn'>Try Free Manual Update</button>

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

          <h3 className='subtitle2'>#5.000</h3>
        </div>

        <p className='text1'>
          Enjoy automatic reshuffle every 4 hours with 6 reshuffle
          chances that guarantees more visibility within 24 hour.
        </p>

        <div className='paidPlanDetailsDiv d-flex'>
          <h3 className='subtitle2'>30 Days</h3>

          <button className='btn paidPlanDetailsBtn'>Subscribe now</button>
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

          <h3 className='subtitle2'>#8.000</h3>
        </div>

        <p className='text1'>
          Enjoy automatic reshuffle every 4 hours with 6 reshuffle
          chances that guarantees more visibility within 24 hour.
        </p>

        <div className='paidPlanDetailsDiv d-flex'>
          <h3 className='subtitle2'>30 Days</h3>

          <button className='btn paidPlanDetailsBtn'>Subscribe now</button>
        </div>
      </div>


    </div>

  )
}
