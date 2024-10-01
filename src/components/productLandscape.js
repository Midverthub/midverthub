import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image'

function ProductLandscape() {
    return (
        <div className='itemToRateInnerDiv-0 d-flex padding-t-b'>

            <div className='itemToRateImg d-flex'>

                <Image
                    width={114}
                    height={90}
                    src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Product Image'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <div className='itemToRateInnerDiv d-flex'>

                <div className='itemToRateTitlePriceDiv d-flex'>
                    <h3 className='itemToRateTitle'>Benz A Class</h3>
                    <h3 className='itemToRatePriceHeader'>N15000000</h3>
                </div>


                <p className='productInfo text2'>Samsung Galaxy S21 Ultra - 128GB
                    Phantom Black
                </p>


                <div className='itemToRateInnerDiv-1 d-flex'>
                    <div className='productLoactionDiv d-flex'>
                        <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                        <p className='productLoaction'>Lagos, Nigeria</p>
                    </div>

                    <div className='usageType d-flex'>
                        <p className='usageTypePgh'>Foreign Used</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductLandscape