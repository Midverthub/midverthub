import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


function ProductContain({ data }) {
    // console.log(data);
    return (
        <div className='productContainDiv'>
            <div className='productContainImg d-flex'>

                <Image
                    width={203}
                    height={140}
                    src={(data.product ? data.product : data).images[0]}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='ProductContain Image'
                    style={{ objectFit: 'contain' }}

                />

                {data.negotiable == "yes" && <div className='priceOption d-flex'><p>Negotiable</p></div>}
            </div>

            <h3 className='priceHeader'>₦{(data.product ? data.product : data).price}</h3>
            <h4 className='productInfo'>{(data.product ? data.product : data).name}</h4>

            <div className='productLoactionDiv d-flex'>
                <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                <p className='productLoaction'>{(data.product ? data.product : data).town}, {(data.product ? data.product : data).state}</p>
            </div>

            <div className='usageType d-flex'>
                <p className='usageTypePgh'>{(data.product ? data.product : data).condition}</p>
            </div>

            <div className='usageType d-flex'>
                <p className='usageTypePgh'>{data.count}</p>
            </div>
        </div>
    )
}

export default ProductContain