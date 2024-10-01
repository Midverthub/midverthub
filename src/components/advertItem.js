import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'


function AdvertItem() {
    return (
        <div className='itemToRateDiv d-flex padding'>
            <div className='itemToRateInnerDiv-0 d-flex'>

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

                <div className='itemToRateInnerDiv padding-t-b d-flex'>

                    <div className='itemToRateTitlePriceDiv d-flex'>
                        <h3 className='itemToRateTitle'>Benz A Class</h3>
                        <h3 className='itemToRatePriceHeader'>N15000000</h3>
                    </div>


                    <h4 className='productInfo'>Samsung Galaxy S21 Ultra - 128GB
                        Phantom Black
                    </h4>


                    <div className='itemToRateInnerDiv-1 d-flex'>
                        <div className='productLoactionDiv d-flex'>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>Lagos, Nigeria</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>Foreign Used</p>
                        </div>
                    </div>

                    <div className='adViewDiv d-flex'>
                        <FontAwesomeIcon icon={faEye} className='iconSize1' />
                        <p className='text1'>30 Views</p>
                    </div>
                </div>


            </div>

            <div className='straightLine'></div>

            <button className='itemToRateBtn '>

                Reshuffle ad
            </button>
        </div>

    )
}

export default AdvertItem