'use client'
import './style.css'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import SubHeader from '@/components/subHeader';

export default function RatingLayout({ children, params }) {
  console.log(params);
  return (
    <section>
      <SubHeader title={params.slug} />
      {children}
    </section>
  )
}
