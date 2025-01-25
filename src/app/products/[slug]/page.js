'use client'
import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import TopSuggested from '@/conatiners/topSuggested';

import { AuthContext } from '../../../../context/authContext';
import Alert from '@/components/alert';
import axios from 'axios'
import Loading from '@/loading';

import Back from '@/components/back';

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}



export default function Product({ params }) {

    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser);
    const [productData, setProductData] = React.useState(null)
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [count, setCount] = React.useState(0)
    const [alertText, setAlertText] = React.useState('')
    const [showAlert, setShowAlert] = React.useState(false)

    const [loadingMini, setLoadingMini] = React.useState(false)
    const [loadingMini2, setLoadingMini2] = React.useState(false)


    React.useEffect(() => {
        if (showAlert) {

            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    React.useEffect(() => {
        // if (isUser && isUser.id) {
        setRequestStatus(REQUEST_STATUS.LOADING)

        async function fetchData() {
            try {
                const result = await axios.get(`/api/products/${params.slug}`);
                setProductData(result.data.data);
                setRequestStatus(REQUEST_STATUS.SUCCESS)

            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE)
                console.error('Error fetching product data:', error);
            }
        }
        fetchData();
        // }
    }, [isUser, params.slug])
    // console.log(productData);


    async function saveProduct() {


        //check if product is already saved
        //check if product belongs to user
        try {
            setLoadingMini(true)

            const result = await axios.get(`/api/saved/${isUser.id}`)
            // console.log(result.data.data);
            const resOut = result.data.data.filter(obj => obj.productId === productData.id);

            if (isUser.id === productData.userId) {
                setLoadingMini(false)
                setAlertText('You cannot save your own product')
                setShowAlert(true)
            } else if (resOut.length !== 0) {
                setLoadingMini(false)
                setAlertText('Product is already saved')
                setShowAlert(true)
            } else {

                const res = await axios.post(`/api/saved/${params.slug}`, {
                    userId: isUser.id,
                    productId: productData.id
                })

                if (res.status === 200) {
                    setLoadingMini(false)
                    setAlertText('Product saved successfully')
                    setShowAlert(true)
                }

                // if (res.status === 400) {
                //     setLoadingMini(false)
                //     setAlertText('Error saving product')
                //     setShowAlert(true)

                // }
            }

        } catch (error) {
            setLoadingMini(false)
            setAlertText('Error saving product try again')
            setShowAlert(true)
            // console.log(error);
        }
    }

    async function followSeller(params) {
        try {
            setLoadingMini2(true)
            const result = await axios.get(`/api/contacts?userId=${isUser.id}`);
            // console.log(result.data.data.following);
            const resOut = result.data.data.following.filter(obj => obj.followingId === productData.userId);

            if (isUser.id === productData.userId) {
                setLoadingMini2(false)
                setAlertText('You cannot follow yourself')
                setShowAlert(true)
                return
            } else if (resOut.length !== 0) {
                setLoadingMini2(false)
                setAlertText('You are already following this seller')
                setShowAlert(true)
                return
            }
            else {
                const res = await axios.post(`/api/contacts/${isUser.id}`, {
                    followingId: productData.userId,
                    userId: isUser.id
                })


                if (res.status === 200) {
                    setLoadingMini2(false)
                    setAlertText('You are now following this seller')
                    setShowAlert(true)
                    // console.log("Seller followed successfully");
                }

                // if (res.status === 400) {
                //     setLoadingMini2(false)
                //     setAlertText('Error following seller')
                //     setShowAlert(true)
                //     // console.log("Error following seller");
                // }
            }

        } catch (error) {
            // console.log(error);
            setLoadingMini2(false)
            setAlertText('Error following seller try again')
            setShowAlert(true)
        }

    }




    if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)


    const length = productData.images.length
    // console.log(length);

    function next(params) {
        setCount(prevState => prevState === length - 1 ? 0 : count + 1)

    }
    // console.log(count);

    function back(params) {

        setCount(prevState => prevState === 0 ? length - 1 : count - 1)
    }


    return (

        <div className='productsMainDiv d-flex'>
            {showAlert && <Alert text={alertText} />}
            <div className='subHeaderDiv d-flex padding'>
                <Back />

                <h3 className='subtitle2' >{productData.name}</h3>
            </div>
            <div className='productImgMain'>
                {(length > 1) && <FontAwesomeIcon className="iconBack" onClick={back} icon={faAngleLeft} />}

                <Image
                    fill
                    // src="/assets/product image.jpeg"
                    src={productData.images[count]}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Homepage Banner'
                    style={{ objectFit: 'contain' }}

                />
                {(length > 1) && <FontAwesomeIcon className="iconForward" onClick={next} icon={faAngleRight} />}

            </div>

            <div className='mainProductInfo d-flex'>
                <h4 className='mainProductName'>{productData.name}</h4>
                <h3 className='mainProductPrice'>₦{productData.price}</h3>
                <p className='mainProductDetails'>{productData.description}
                </p>

                <div className='mainProductInfoInnerDiv d-flex'>
                    <div className='mainProductInfoInnerDiv1 d-flex'>

                        <div className='productLoactionDiv usageType d-flex '>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>{productData.town}, {productData.state}</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>{productData.condition}</p>
                        </div>
                    </div>

                    <div className='mainProductInfoInnerDiv2 d-flex'>
                        <button>
                            <Image
                                width={18}
                                height={18}
                                src="/assets/iconshare.svg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt='Share'
                                style={{ objectFit: 'contain' }}
                            />
                        </button>

                        <button disabled={!isUser} onClick={() => saveProduct()}>
                            <Image
                                width={18}
                                height={18}
                                src={loadingMini ? "/assets/loadingTwo.svg" : "/assets/iconsave.svg"}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt='Save'
                                style={{ objectFit: 'contain' }}
                            // onClick={() => saveProduct()}
                            />
                        </button>

                    </div>
                </div>

            </div>

            <div className='mainProductButtonDiv d-flex'>
                <button className='btn'>
                    Chat Seller
                </button>
                {/* <div className='mainProductButton1 d-flex'>
                    <h3 className='mainProductButtonHeader'>Chat Seller</h3>
                </div> */}

                <button onClick={() => followSeller()} className='btn mainProductButton2 d-flex'>
                    {loadingMini2 ?
                        <Image
                            width={18}
                            height={18}
                            src="/assets/loadingTwo.svg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt='Save'
                            style={{ objectFit: 'contain' }}
                        // onClick={() => saveProduct()}
                        /> : "Follow Seller"
                    }
                </button>
            </div>

            <div className='mainProductMoreInfo d-flex'>
                <h3 className='mainProductMoreInfoHeader'>More Info:</h3>


                <div className='mainProductMoreInfoInner d-flex'>
                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>State of item:</p>
                        <p className='mainProductMoreInfoDetails'>{productData.condition}</p>
                    </div>

                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Returns:</p>
                        <p className='mainProductMoreInfoDetails'>This item is non-returnable</p>
                    </div>

                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Color:</p>
                        <p className='mainProductMoreInfoDetails'>Grey</p>
                    </div>


                    <div className='mainProductMoreInfoInnerDiv d-flex'>
                        <p className='mainProductMoreInfoTitle'>Category:</p>
                        <Link className='links' href={`/categories/${productData.categoryTitle}`}>
                            <p className='mainProductMoreInfoDetails'>{productData.categoryTitle}</p>
                        </Link>
                    </div>
                </div>


                <button className='btn'>
                    Request agent
                </button>
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