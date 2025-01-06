import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { ProductContext } from '../../context/productContext'


function AdvertItem({ data }) {

    const { isProduct, setProduct, isLoading } = React.useContext(ProductContext)

    console.log(data);
    return (
        <div className='itemToRateDiv d-flex padding'>
            <div className='itemToRateInnerDiv-0 d-flex'>
                <div className='itemToRateImg d-flex'>


                    <Link className='links' href={`/products/${data.id}`}>
                        <Image
                            width={114}
                            height={90}
                            src={data.images[0]}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt='Product Image'
                            style={{ objectFit: 'cover' }}

                        />
                    </Link>

                </div>

                <div className='itemToRateInnerDiv padding-t-b d-flex'>

                    <div className='itemToRateTitlePriceDiv d-flex'>
                        <h3 className='itemToRateTitle'>{data.name}</h3>
                        <h3 className='itemToRatePriceHeader'>{data.price}</h3>
                    </div>


                    <h4 className='productInfo'>{data.description}
                    </h4>


                    <div className='itemToRateInnerDiv-1 d-flex'>
                        <div className='productLoactionDiv d-flex'>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>{data.town}, {data.state}</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>{data.condition}</p>
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
                <Link onClick={setProduct(data)} className='link' href='/reShuffle'>

                    Reshuffle ad
                </Link>
            </button>
        </div >

    )
}

export default AdvertItem