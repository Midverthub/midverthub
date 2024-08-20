'use client'
import React from 'react'

function Radio() {

    const [formData, setFormData] = React.useState({

        priceCategory: ""
    });

    // console.log(formData);

    function handlechg(e) {
        // console.log(e.target);
        const { name, value, checked, type } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function handleSub(e) {
        e.preventDefault();
        console.log(formData);
    }


    return (
        <form className='priceCategoryForm  d-flex' onSubmit={handleSub}>
            {/* <fieldset> */}
            {/* <legend>Current Employment Status</legend> */}

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="categoryOne"
                    name="priceCategory"
                    onChange={handlechg}
                    checked={formData.priceCategory === "categoryOne"}
                    value="categoryOne"
                    className='radioInput'
                />
                <label htmlFor="categoryOne">1.5 Million - 3.5 Million <span className='priceCategoryFormSpan'>- 300 Ads</span></label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="categoryTwo"
                    name="priceCategory"
                    onChange={handlechg}
                    checked={formData.priceCategory === "categoryTwo"}
                    value="categoryTwo"
                    className='radioInput'
                />
                <label htmlFor="categoryTwo">15 Million - 35 Million <span className='priceCategoryFormSpan'>- 300 Ads</span></label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="categoryThree"
                    name="priceCategory"
                    onChange={handlechg}
                    checked={formData.priceCategory === "categoryThree"}
                    value="categoryThree"
                    className='radioInput'
                />
                <label htmlFor="categoryThree">150 Million - 350 Million <span className='priceCategoryFormSpan'>- 300 Ads</span></label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="categoryFour"
                    name="priceCategory"
                    onChange={handlechg}
                    checked={formData.priceCategory === "categoryFour"}
                    value="categoryFour"
                    className='radioInput'
                />
                <label htmlFor="categoryFour">1500 Million - 3500 Million <span className='priceCategoryFormSpan'>- 300 Ads</span></label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="categoryFive"
                    name="priceCategory"
                    onChange={handlechg}
                    checked={formData.priceCategory === "categoryFive"}
                    value="categoryFive"
                    className='radioInput'
                />
                <label htmlFor="categoryFive">150,000 Million - 350,000 Million <span className='priceCategoryFormSpan'>- 300 Ads</span></label>
            </div>
            {/* </fieldset> */}

            {/* <button type="submit">Submit</button> */}
        </form >
    )
}

export default Radio