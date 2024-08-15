import Product from '@/components/product'
import React from 'react'

function TopSuggested() {
    return (
        <div>
            <h3>Top Suggested</h3>
            <p>Based on purchases and views by others</p>

            <div>
                <Product />
            </div>
        </div>
    )
}

export default TopSuggested