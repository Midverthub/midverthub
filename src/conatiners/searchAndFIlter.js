import React from 'react'
import CategoriesSearch from '@/components/categoriesSearch'
import Filter from '@/components/filter'

function SearchAndFIlter() {
    return (
        <div className='searchAndFilterDiv d-flex'>
            <CategoriesSearch />
            <Filter />
        </div>
    )
}

export default SearchAndFIlter