'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import TopSuggested from '@/conatiners/topSuggested';



export default function Product({ params }) {


    return (
        <div className='productsMainDiv d-flex'>
            <div className='productImgMain'>
                <Image
                    fill
                    src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Homepage Banner'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <div className='mainProductInfo d-flex'>
                <h4 className='mainProductName'>Samsung Galaxy S21 Ultra - 128GB Phantom Black</h4>
                <h3 className='mainProductPrice'># 15,000,000</h3>
                <p className='mainProductDetails'>All items displayed are readily available to customers within Ajika, Lagos Nigeria
                    and can be delivered once order is  confirmed
                </p>

                <div className='mainProductInfoInnerDiv d-flex'>
                    <div className='mainProductInfoInnerDiv1 d-flex'>

                        <div className='productLoactionDiv usageType d-flex '>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>Lagos, Nigeria</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>Foreign Used</p>
                        </div>
                    </div>

                    <div className='mainProductInfoInnerDiv2 d-flex'>
                        <div>
                            <Image
                                width={18}
                                height={18}
                                src="/assets/iconshare.svg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt='Share'
                                style={{ objectFit: 'contain' }}

                            />
                        </div>

                        <div>
                            <Image
                                width={18}
                                height={18}
                                src="/assets/iconsave.svg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt='Save'
                                style={{ objectFit: 'contain' }}

                            />
                        </div>

                    </div>
                </div>

            </div>

            <div className='mainProductButtonDiv d-flex'>
                <div className='mainProductButton1 d-flex'>
                    <h3 className='mainProductButtonHeader'>Chat Seller</h3>
                </div>

                <div className='mainProductButton1 mainProductButton2 d-flex'>
                    <h3 className='mainProductButtonHeader'>View Seller Profile</h3>
                </div>
            </div>

            <div className='mainProductMoreInfo d-flex'>
                <h3 className='mainProductMoreInfoHeader'>More Info:</h3>


                <div className='mainProductMoreInfoInner d-flex'>
                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>State of item:</p>
                        <p className='mainProductMoreInfoDetails'>Brand new</p>
                    </div>

                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Returns:</p>
                        <p className='mainProductMoreInfoDetails'>This item is non-returnable</p>
                    </div>

                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Payment:</p>
                        <p className='mainProductMoreInfoDetails'>Before delivery</p>
                    </div>

                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Color:</p>
                        <p className='mainProductMoreInfoDetails'>Grey</p>
                    </div>
                </div>


            </div>
            <div className='mainProductButton1 d-flex'>
                <h3 className='mainProductButtonHeader'>Request agent</h3>
            </div>

            <div className='PreviousRatings d-flex'>
                <h3 className='PreviousRatingsHeader' >Previous seller Rating</h3>

                <div className='PreviousRatingsInnerDiv d-flex'>
                    <div className='PreviousRatingsImg'></div>
                    <div className='PreviousRatingsInfo d-flex'>
                        <h3 className='PreviousRatingsName'>John Doe</h3>
                        <p className='PreviousRatingsDetails'>All items displayed are readily available to customers within Ajika, Lagos Nigeria </p>
                    </div>
                </div>
                <h5 className='PreviousRatingsMore'>{"View More >"}</h5>
            </div>

            <TopSuggested />
        </div >

    )
}