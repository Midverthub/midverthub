"use client"
import React, { use } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import axios from 'axios';

import Image from 'next/image'

function ProductLandscape({ user, data, saved, deleteBtn }) {
    // console.log(user);
    console.log(data);
    // console.log(saved);


    // React.useEffect(() => {
    //     axios.delete(`/api/saved/${isUser.id}?productId=${data.id}`), {
    //         userId: isUser.id,
    //         productId: data.id,
    //         savedId: data.savedId
    //     }
    // })

    async function deleteFunc(params) {
        // console.log(user.id, data.id, saved.id);
        try {

            const res = await fetch(`/api/saved/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    productId: data.id,
                    savedId: saved.id
                })
            })
            // const res = await axios.delete(`/api/saved/${user.id}`, {
            //     userId: user.id,
            //     productId: data.id,
            //     savedId: saved.id
            // });
            // console.log(res);
            if (res.status === 200) {
                // console.log('Product deleted successfully');
                // console.log(res);

            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }


    return (
        <div className='itemToRateInnerDiv-0 d-flex padding-t-b'>


            <div className='itemToRateImg d-flex'>

                <Image
                    width={114}
                    height={90}
                    src={data.images[0]}
                    // src="/assets/product image.jpeg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Product Image'
                    style={{ objectFit: 'contain' }}

                />
            </div>

            <Link className='links' href={`/products/${data.id}`}>
                <div className='itemToRateInnerDiv d-flex'>

                    <div className='itemToRateTitlePriceDiv d-flex'>
                        <h3 className='itemToRateTitle'>{data.name}</h3>
                        <h3 className='itemToRatePriceHeader'>₦{data.price}</h3>
                    </div>


                    <p className='productInfo text2'>{data.description}
                    </p>


                    <div className='itemToRateInnerDiv-1 d-flex'>
                        <div className='productLoactionDiv d-flex'>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>{data.town}, {data.state}</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>{data.condition}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <FontAwesomeIcon onClick={(e) => deleteBtn(e, saved)} icon={faTrash} className='loactionIcon cursor' />


        </div>
    )
}

export default ProductLandscape