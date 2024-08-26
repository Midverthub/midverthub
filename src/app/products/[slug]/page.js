'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Product({ params }) {


    return (
        <div className='productsMainDiv d-flex'>
            <div className='productImgMain'>
                <Image
                    fill
                    src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Homepage Banner'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <div className='mainProductInfo'>

            </div>
        </div >

    )
}