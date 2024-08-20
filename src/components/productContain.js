import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


function ProductContain() {
    return (
        <div className='productContainDiv'>
            <div className='productContainImg d-flex'>

                <Image
                    width={203}
                    height={140}
                    src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='ProductContain Image'
                    style={{ objectFit: 'contain' }}

                />

                <div className='priceOption d-flex'><p>Negotiable</p></div>
            </div>

            <h3 className='priceHeader'>N15000000</h3>
            <h4 className='productInfo'>Samsung Galaxy S21 Ultra - 128GB
                Phantom Black</h4>

            <div className='productLoactionDiv d-flex'>
                <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                <p className='productLoaction'>Lagos, Nigeria</p>
            </div>

            <div className='usageType d-flex'>
                <p className='usageTypePgh'>Foreign Used</p>
            </div>
        </div>
    )
}

export default ProductContain