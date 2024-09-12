'use client'
import './style.css'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function RatingLayout({ children }) {
  return (
    <section>
      <div className='ratingInnerDiv d-flex padding'>
        <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

        <h3 className='ratingHeader' >Pending Rating</h3>
      </div>
      {children}
    </section>
  )
}
