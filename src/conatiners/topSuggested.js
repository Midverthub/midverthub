import Product from '@/components/product'
import React from 'react'
import Link from 'next/link'

function TopSuggested() {
    return (
        <div className='suggestionDiv'>
            <h3 className='suggestionHeader'>Top Suggested</h3>
            <p className='suggestionPgh'>Based on purchases and views by others</p>

            <div className='suggestionInnerDiv d-flex'>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>
                <Link className='link' href={'/products/1'}>
                    <Product />
                </Link>

            </div>
        </div>
    )
}

export default TopSuggested