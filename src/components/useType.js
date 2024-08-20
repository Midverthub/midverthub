"use client"
import React from 'react'

function UseType() {


    const [formData, setFormData] = React.useState({

        useType: ""
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
        <form className='useTypeForm  d-flex' onSubmit={handleSub}>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="localUsed"
                    name="useType"
                    onChange={handlechg}
                    checked={formData.useType === "localUsed"}
                    value="localUsed"
                    className='radioInput'
                />
                <label htmlFor="localUsed">Local Used</label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="brandNew"
                    name="useType"
                    onChange={handlechg}
                    checked={formData.useType === "brandNew"}
                    value="brandNew"
                    className='radioInput'
                />
                <label htmlFor="brandNew">Brand New</label>
            </div>

            <div className='priceCategoryFormInnerDiv d-flex'>
                <input
                    type="radio"
                    id="foreignUsed"
                    name="useType"
                    onChange={handlechg}
                    checked={formData.useType === "foreignUsed"}
                    value="foreignUsed"
                    className='radioInput'
                />
                <label htmlFor="foreignUsed">Foreign Used</label>
            </div>
        </form >
    )
}

export default UseType