import BrandItem from '@/components/brandItem'
import React from 'react'

function BrandCategories() {
    return (

        <div className='brandCategories d-flex'>
            <h3 className='suggestionHeader'>Select Brand</h3>
            <div className='brandCategoriesInnerDiv d-flex'>

                <BrandItem />
                <BrandItem />
                <BrandItem />
                <BrandItem />
                <BrandItem />
                <BrandItem />
            </div>
        </div>
    )
}

export default BrandCategories