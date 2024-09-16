'use client'
import SubHeader from '@/components/subHeader';
import './style.css'

import React from 'react';

export default function RatingLayout({ children }) {
  return (
    <section>
      <SubHeader />

      {children}
    </section>
  )
}
