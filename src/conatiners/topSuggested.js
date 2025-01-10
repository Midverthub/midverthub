import Product from '@/components/product'
import React from 'react'
import Link from 'next/link'

function TopSuggested() {
    return (
        <div className='suggestionDiv'>
            <h3 className='suggestionHeader'>Top Suggested</h3>
            <p className='suggestionPgh'>Based on purchases and views by others</p>

            <div className='suggestionInnerDiv d-flex'>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />

            </div>
        </div>
    )
}

export default TopSuggested