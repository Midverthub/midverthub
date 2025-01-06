import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'


function ItemToRate({ data }) {
    console.log(data.product);
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

                <div className='itemToRateInnerDiv d-flex'>

                    <div className='itemToRateTitlePriceDiv d-flex'>
                        <h3 className='itemToRateTitle'>{data.product.name}</h3>
                        <h3 className='itemToRatePriceHeader'>{data.product.price}</h3>
                    </div>


                    <h4 className='productInfo'>{data.product.description}
                    </h4>


                    <div className='itemToRateInnerDiv-1 d-flex'>
                        <div className='productLoactionDiv d-flex'>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>{data.product.town}, {data.product.state}</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>{data.product.condition}</p>
                        </div>
                    </div>

                    <p className='itemToRatePgh'>Completed June 24 of2024</p>
                </div>


            </div>

            <div className='straightLine'></div>

            <button className='itemToRateBtn'>
                RATE PRODUCT NOW
            </button>
        </div>

    )
}

export default ItemToRate