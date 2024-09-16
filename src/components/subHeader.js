import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


function SubHeader({ title }) {
    console.log(title);
    return (
        <div className='subHeaderDiv d-flex padding'>
            <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

            <h3 className='subHeaderDivHeader' >{title}</h3>
        </div>
    )
}

export default SubHeader