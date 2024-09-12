'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import Image from 'next/image'
import Link from 'next/link'
import ItemToRate from '@/components/itemToRate';

export default function Rating() {


    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };


    const [formData, setFormData] = React.useState({
        reviewTitle: "",
        detailedTitle: "",
        starRating: ""
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

        if (true) { //isValid
            console.log("submit");
            setStatus(STATUS.COMPLETED);
            // setFinished(prev => !prev)
            console.log(formData);
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    function getErrors(params) {
        const result = {}

        if (!formData.detailedTitle) {
            result.detailedTitle = "Title is required";
        }
        if (!formData.reviewTitle) {
            result.reviewTitle = "Enter a review";
        }

        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)




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
                            <label htmlFor="detailedTitle">Detailed Title</label>

                            <textarea
                                id="detailedTitle"
                                name="detailedTitle"
                                className="textarea"
                                placeholder="Tell us more about the product"
                                onChange={handleChg}
                                onBlur={handleBlur}
                                value={formData.detailedTitle} />

                            <p className="error" role="alert">
                                {(touched.detailedTitle || isStatus === STATUS.SUBMITTED) && errors.detailedTitle}
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
                    // disabled={!(formData.email || formData.password || formData.passwordCheck)}
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
