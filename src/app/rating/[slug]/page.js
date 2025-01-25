"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image'
import Link from 'next/link'

import { AuthContext } from "../../../../context/authContext";
import Loading from '@/loading'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Redirect from '../../../../hooks/redirect';

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
};

export default function Rating({ params }) {
    const { redirectFunc } = Redirect()

    redirectFunc()

    const router = useRouter();

    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser);
    const [productData, setProductData] = React.useState([])
    const [redirect, setRedirect] = React.useState(false)
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


    React.useEffect(() => {
        if (isUser && isUser.id) {
            setRequestStatus(REQUEST_STATUS.LOADING)
            async function fetchData() {
                try {
                    const result = await axios.get(`/api/ratings?ratingId=${params.slug}`);
                    setProductData(result.data.data);
                    setRequestStatus(REQUEST_STATUS.SUCCESS)
                    // console.log(result.data);
                } catch (error) {
                    setRequestStatus(REQUEST_STATUS.FAILURE)
                    console.error('Error fetching product data:', error);
                }
            }
            fetchData();
        }
    }, [isUser, params.slug])
    // console.log(productData);


    React.useEffect(() => {
        if (redirect) {

            const timer = setTimeout(() => {

                router.push("/");
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [redirect, router]);





    const [formData, setFormData] = React.useState({
        reviewTitle: "",
        // detailedTitle: "",
        detailedReview: "",
        starRating: 0
    });


    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});
    // const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)

    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    function handleChg(e) {
        const { name, value, checked, type } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched((prevState) => {
            return {
                ...prevState,
                [name]: true,
            };
        });

    }


    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target);
        setStatus(STATUS.SUBMITTING);

        if (isValid) { //isValid
            // console.log("submit");

            try {
                const res = await fetch(`/api/reviews/${productData.product.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: isUser.id,
                        productId: productData.product.id,
                        content: formData.detailedReview,
                        rating: Number(formData.starRating)
                    }),
                })

                if (res.status === 200) {
                    // console.log(await res.json());
                    setStatus(STATUS.COMPLETED);
                    try {
                        const result = await fetch(`/api/ratings/${params.slug}?userId=${isUser.id}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId: isUser.id,
                                productId: productData.productId,
                                ratingId: params.slug

                            }),

                        });
                        if (result.status === 200) {
                            // console.log("rating successfull removed", await result.json());
                            setStatus(STATUS.COMPLETED);
                        }

                    } catch (error) {
                        console.error("An error occurred", error);
                        setLoginError(error)

                    }

                    setRedirect(true)
                    // setFinished(prev => !prev)
                    // console.log("Review submitted successfully");
                }

            } catch (error) {
                console.error("An error occurred", error);
                setLoginError(error)

            }
            // setStatus(STATUS.COMPLETED);
            // setFinished(prev => !prev)
            // console.log(formData);
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    function getErrors(params) {
        const result = {}

        if (!formData.detailedReview) {
            result.detailedReview = "Enter a review";
        }
        if (!formData.reviewTitle) {
            result.reviewTitle = "Title is required";
        }

        return result;
    }

    if (loginError) throw loginError


    // if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)

    if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING || isStatus === "SUBMITTING") return (<Loading />)



    return (

        <div className=" ratingDiv margin-t-b">

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
                        <h3 className='itemToRateTitle'>{productData.product.name}</h3>
                        <h3 className='itemToRatePriceHeader'>{productData.product.price}</h3>
                    </div>


                    <h4 className='productInfo'>{productData.product.description}
                    </h4>


                    <div className='itemToRateInnerDiv-1 d-flex'>
                        <div className='productLoactionDiv d-flex'>
                            <FontAwesomeIcon icon={faLocationDot} className='loactionIcon' />
                            <p className='productLoaction'>{productData.product.town}, {productData.product.state}</p>
                        </div>

                        <div className='usageType d-flex'>
                            <p className='usageTypePgh'>{productData.product.condition}</p>
                        </div>
                    </div>

                    <p className='itemToRatePgh'>Completed June 24 of2024</p>
                </div>

            </div>

            <div className='ratingFormDivMain margin-t-b '>

                <h3 className='ratingFormHeader padding-l-r'>Rate this product</h3>

                <form className=' form ratingForm d-flex margin-t-b ' onSubmit={handleSubmit}>
                    <div className='ratingFormDiv d-flex  padding'>


                        <div className='inputDivs d-flex'>
                            <label htmlFor="reviewTitle"> Review Title</label>

                            <input
                                type="text"
                                name="reviewTitle"
                                id="reviewTitle"
                                placeholder="e.g. I like It/ Its a bad product"
                                onChange={handleChg}
                                onBlur={handleBlur}
                                value={formData.reviewTitle}
                            />
                            <p className="error" role="alert">
                                {(touched.reviewTitle || isStatus === STATUS.SUBMITTED) && errors.reviewTitle}
                            </p>

                        </div>


                        <div className="textarea-div inputDivs d-flex">
                            <label htmlFor="detailedReview">Detailed Review</label>

                            <textarea
                                id="detailedReview"
                                name="detailedReview"
                                className="textarea"
                                placeholder="Tell us more about the product"
                                onChange={handleChg}
                                onBlur={handleBlur}
                                value={formData.detailedReview} />

                            <p className="error" role="alert">
                                {(touched.detailedReview || isStatus === STATUS.SUBMITTED) && errors.detailedReview}
                            </p>
                        </div>



                    </div>


                    <div className='ratingStarsDivMain d-flex'>

                        <h3 className='ratingStarHeader'>Tap the stars to rate</h3>

                        <div className='ratingStarsDiv d-flex' >

                            <input
                                type="radio"
                                id="5"
                                name="starRating"
                                onChange={handleChg}
                                checked={formData.starRating === "5"}
                                value="5"
                            />
                            <label htmlFor="5">
                                <FontAwesomeIcon icon={faStar} className='starIcon' />
                            </label>

                            <input
                                type="radio"
                                id="4"
                                name="starRating"
                                onChange={handleChg}
                                checked={formData.starRating === "4"}
                                value="4"
                            />
                            <label htmlFor="4">
                                <FontAwesomeIcon icon={faStar} className='starIcon' />
                            </label>

                            <input
                                type="radio"
                                id="3"
                                name="starRating"
                                onChange={handleChg}
                                checked={formData.starRating === "3"}
                                value="3"
                            />
                            <label htmlFor="3">
                                <FontAwesomeIcon icon={faStar} className='starIcon' />
                            </label>

                            <input
                                type="radio"
                                id="2"
                                name="starRating"
                                onChange={handleChg}
                                checked={formData.starRating === "2"}
                                value="2"
                            />
                            <label htmlFor="2">
                                <FontAwesomeIcon icon={faStar} className='starIcon' />
                            </label>

                            <input
                                type="radio"
                                id="1"
                                name="starRating"
                                onChange={handleChg}
                                checked={formData.starRating === "1"}
                                value="1"
                            />
                            <label htmlFor="1">
                                <FontAwesomeIcon icon={faStar} className='starIcon' />
                            </label>

                        </div>
                    </div>

                    <button
                        className="subBtn ratingSubBtn padding-l-r"
                        type="submit"
                        disabled={!(formData.detailedReview && formData.reviewTitle && formData.starRating)}
                    >
                        {/* <Link className='links' href="/signup/"> */}
                        Submit
                        {/* </Link> */}
                    </button>

                </form>


            </div>


        </div>

    )
}
