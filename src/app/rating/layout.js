import './style.css'

import React from 'react';
import Back from '@/components/back';

export default function RatingLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <Back />

        <h3 className='subtitle2' >Ratings</h3>
      </div>

      {children}
    </section>
  )
}
