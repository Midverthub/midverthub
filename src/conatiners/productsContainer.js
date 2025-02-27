"use client"
import React from 'react'
import ProductContain from '@/components/productContain'

import Link from 'next/link'

function ProductsContainer({ data }) {
    // console.log(data);


    return (
        <div className='productsContainer'>
            {
                data.map((product, index) => {
                    return (
                        <Link className='links' key={index} href={`/products/${product.id}`}>
                            <ProductContain data={product} />
                        </Link>
                    )
                })
            }
            {/* <Link className='link' href={'products/1'}>
                <ProductContain data={productData.data} />
            </Link> */}



        </div>
    )
}

export default ProductsContainer