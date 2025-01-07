import './style.css'

import React from 'react';
import Back from '@/components/back';

export default function UserProfileLayout({ children, params }) {
  // console.log(params);
  return (
    <section>
      <div className='subHeaderDiv d-flex padding'>
        <Back />

        <h3 className='subtitle2' >User Profile</h3>
      </div>
      {children}
    </section>
  )
}
