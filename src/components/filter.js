import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function Filter() {
    return (
        <div className='filterDiv d-flex'>
            <FontAwesomeIcon icon={faFilter} className='filterIcon' />
            <p>All filter</p>
        </div>
    )
}

export default Filter