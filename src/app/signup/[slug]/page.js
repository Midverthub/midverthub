'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';


import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {

    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };


    const [formData, setFormData] = React.useState({

        fullName: "",
        email: "",
        phone: "",
        cityOrState: "",
        provinceAndRegion: "",
        postalCode: ""

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
        console.log(e.target);

        const displayName = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(displayName, email, password,)

        setStatus(STATUS.SUBMITTING);

        if (isValid) {
            console.log("submit");
            setStatus(STATUS.COMPLETED);
            setFinished(prev => !prev)
            console.log(formData);
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    function ValidateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }

    function CheckText(inputtxt) {
        var decimal = /[^ a - zA - Z] +/g;
        if (inputtxt.match(decimal)) {
            return true;
        }
        else {
            return false;
        }
        // return true
    }


    function CheckPhone(inputtxt) {
        var decimal = /^\+?[1-9][0-9]{7,14}$/;
        if (inputtxt.match(decimal)) {
            return true;
        }
        else {
            return false;
        }
        // return true
    }

    function CheckZip(inputtxt) {
        var decimal = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (inputtxt.match(decimal)) {
            return true;
        }
        else {
            return false;
        }
        // return true
    }


    function getErrors(params) {
        const result = {}

        if (!formData.email) {
            result.email = "Email is required";
        } else if (!ValidateEmail(formData.email)) {
            result.email = "Email is not correct";
        }

        if (!formData.fullName) {
            result.fullName = "Full name is required";
        } else if (!CheckText(formData.fullName)) {
            result.fullName = "Name cannot contian special charaters or numbers";
        }

        if (!formData.phone) {
            result.phone = "Phone number is required";
        } else if (!CheckPhone(formData.phone)) {
            result.phone = "Phone Number cannot contian letters";
        }

        if (!formData.postalCode) {
            result.postalCode = "Postal code is required";
        } else if (!CheckZip(formData.postalCode)) {
            result.postalCode = "Postal code cannot contain special charaters or letters";
        }


        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


    return (

        <div className="formDiv d-flex">

            <p className='login-pgh'> You are almost there!</p>

            <form className=' form d-flex' onSubmit={handleSubmit}>

                <div className='inputDivs d-flex'>
                    <label htmlFor="fullName"> Full Name*</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.fullName}
                    />
                    <p className="error" role="alert">
                        {(touched.fullName || isStatus === STATUS.SUBMITTED) && errors.fullName}
                    </p>

                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="email"> E-mail*</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.email}
                    />
                    <p className="error" role="alert">
                        {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
                    </p>

                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="phone"> Phone*</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Phone Number"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.phone}
                    />
                    <p className="error" role="alert">
                        {(touched.phone || isStatus === STATUS.SUBMITTED) && errors.phone}
                    </p>

                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="cityOrState"> City Or State*</label>
                    <input
                        type="text"
                        name="cityOrState"
                        id="cityOrState"
                        placeholder="City/State"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.cityOrState}
                    />
                    <p className="error" role="alert">
                        {(touched.cityOrState || isStatus === STATUS.SUBMITTED) && errors.cityOrState}
                    </p>
                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="provinceAndRegion"> Province And Region*</label>
                    <input
                        type="text"
                        name="provinceAndRegion"
                        id="provinceAndRegion"
                        placeholder="Province/Region"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.provinceAndRegion}
                    />
                    <p className="error" role="alert">
                        {(touched.provinceAndRegion || isStatus === STATUS.SUBMITTED) && errors.provinceAndRegion}
                    </p>
                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="postalCode"> Postal code*</label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Postal code"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.postalCode}
                    />
                    <p className="error" role="alert">
                        {(touched.postalCode || isStatus === STATUS.SUBMITTED) && errors.postalCode}
                    </p>
                </div>



                <button
                    className="subBtn"
                    type="submit"
                    disabled={!(formData.email || formData.password || formData.passwordCheck)}
                >
                    Continue
                </button>

                <p className='termPgh'>
                    By continuing, You agree to our Conditions of  Use and Privacy Notice
                </p>

            </form>

        </div>

    )
}
