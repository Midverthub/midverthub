import React from 'react'
import ProductContain from '@/components/productContain'

import Link from 'next/link'

function ProductsContainer() {
    return (
        <div className='productsContainer'>
            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

            <Link className='link' href={'products/1'}>
                <ProductContain />
            </Link>

        </div>
    )
}

export default ProductsContainer