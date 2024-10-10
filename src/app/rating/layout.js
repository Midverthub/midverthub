'use client'
import './style.css'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function RatingLayout({ children, params }) {
  console.log(params);
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

        <h3 className='subtitle2' >Ratings</h3>
      </div>

      {children}
    </section>
  )
}
