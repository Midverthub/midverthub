import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { ProductContext } from '../../context/productContext'


function AdvertItem({ data, deleteBtn }) {

    const { isProduct, setProduct, isLoading } = React.useContext(ProductContext)


    function dataFunc(e, data) {
        // console.log(e);
        // console.log(data);
        setProduct(data)
    }


    // console.log(data);
    return (
        <div className='itemToRateDiv d-flex padding'>
            <div className='itemToRateInnerDiv-0 d-flex'>
                {
                    data.paidAdvert &&
                    <div className='reshuffledAdDiv d-flex'>
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className='iconSize1' />

                        <h3 className='reshuffledAdHeader'>Reshuffled</h3>
                    </div>
                }
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

            <div className='d-flex itemToRateInnerDiv-2'>
                <FontAwesomeIcon onClick={(e) => { deleteBtn(e, data) }} icon={faTrash} className='trashCan iconSize1 cursor' />


                <button className='itemToRateBtn '>
                    <Link onClick={e => dataFunc(e, data)} className='link' href='/reShuffle'>

                        Reshuffle ad
                    </Link>
                </button>
            </div>
        </div >

    )
}

export default AdvertItem