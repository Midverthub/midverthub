'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

import { AuthContext } from '../../../../context/authContext';
import { useRouter } from 'next/navigation';
import Loading from '../../../loading';
import axios from 'axios';

import { SessionContext } from '../../../../context/sessionContext';
import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
};

const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}


export default function SignUpContinue() {
    // const { session } = React.useContext(SessionContext)
    // if (session) {
    //     redirect('/')
    // }
    const router = useRouter()

    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser);


    const [requestStatus, setRequestStatus] = React.useState()
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);

    const [formData, setFormData] = React.useState({

        fullName: "",
        email: "" || isUser ? (isUser.email) : "",
        phone: "",
        cityOrState: "",
        provinceAndRegion: "",
        postalCode: ""

    });

    const [data, setData] = React.useState(null);
    const [touched, setTouched] = React.useState({});
    // const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)
    const [locationIndex, setlocationIndex] = React.useState()

    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    React.useEffect(() => {

        if (isUser && isUser.id) {
            setRequestStatus(REQUEST_STATUS.LOADING);
            async function fetchMapData() {
                try {
                    const result = await axios.get('/data.json')
                    setData(result.data)
                    setRequestStatus(REQUEST_STATUS.SUCCESS)
                    // .then(response => response.json())
                    // .then(data => setData(data)).finally(() => {
                    //     setRequestStatus(REQUEST_STATUS.SUCCESS);

                    // });
                } catch (error) {
                    setRequestStatus(REQUEST_STATUS.FAILURE);
                    console.log('Error fetching data:', error);
                }
            }
            fetchMapData();

        }
    }, [isUser]);


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



        if (isValid) {
            // console.log("submit");
            try {
                setRequestStatus(REQUEST_STATUS.LOADING);
                // console.log('i got here');
                // console.log(isUser.id);
                const body = {
                    userId: isUser.id,
                    name: formData.fullName,
                    phone: formData.phone,
                    state: formData.cityOrState,
                    lga: formData.provinceAndRegion,
                };

                if (formData.postalCode) {
                    body.postalcode = formData.postalCode;
                }

                const res = await fetch("/api/auth/users", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (res.status === 400) {
                    // setLoginError("User already exists");
                    setRequestStatus(REQUEST_STATUS.FAILURE);
                    setLoginError("Something went wrong, try again");
                }


                if (res.status === 200) {
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
                    setLoginError("");
                    router.push('/');
                }

            } catch (error) {
                // console.log(error);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setLoginError("Something went wrong, try again");
            }
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            // setStatus(STATUS.COMPLETED);

            // console.log(formData);
        } else {
            setRequestStatus(REQUEST_STATUS.SUCCESS);
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
        var decimal = /^[a-zA-Z\s]+$/
        if (inputtxt.match(decimal)) {
            return true;
        }
        else {
            return false;
        }
    }


    function CheckPhone(inputtxt) {
        // var number = /^\+?\d{1,3}?\s?\d{10}$/;
        var number = /^\d{11}$/;
        if (inputtxt.match(number)) {
            return true;
        }
        else {
            return false;
        }
        // return true
    }

    function ValidatePhone(inputtxt) {
        const cleanedInput = inputtxt.replace(/[\s\-\(\)]/g, '');

        const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;

        return internationalPhoneRegex.test(cleanedInput);
    }

    function CheckZip(inputtxt) {
        var decimal = /^[A-Za-z0-9\s\-]{3,10}$/;
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
        } else if (!ValidatePhone(formData.phone)) {
            result.phone = "Enter a valid phone number with country code (e.g., +2348081183312)";
        }

        // if (!formData.postalCode) {
        //     result.postalCode = "Postal code is required";
        // } else if (!CheckZip(formData.postalCode)) {
        //     result.postalCode = "Postal code cannot contain special charaters or letters";
        // }

        if (!formData.cityOrState) {
            result.cityOrState = "City or State is required";
        }

        if (!formData.provinceAndRegion) {
            result.provinceAndRegion = "Province or Region is required";
        }


        return result;
    }

    // if (loginError) throw loginError


    if (requestStatus === REQUEST_STATUS.LOADING || isLoading === "loading" || !data) return (<Loading />)

    // if
    //     (data) {
    //     data.map(map => console.log(map));
    // }

    // if (data) {
    //     console.log(

    //         data.filter((city) => city.name === "Lagos")[0].cities
    //     );
    // }

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

                <div className='inputDivs d-flex '>
                    <label htmlFor="cityOrState"> City Or State*</label>

                    <select
                        name="cityOrState"
                        id="cityOrState"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.cityOrState}
                    >
                        <option value="">City or State</option>
                        {
                            data && data.map((city, index) => (
                                <option key={index} value={city.name}>{city.name}</option>
                            ))
                        }

                    </select>

                    <p className="error" role="alert">
                        {(touched.cityOrState || isStatus === STATUS.SUBMITTED) && errors.cityOrState}
                    </p>

                </div>

                <div className='inputDivs d-flex '>
                    <label htmlFor="provinceAndRegion"> Province OR Region*</label>

                    <select
                        name="provinceAndRegion"
                        id="provinceAndRegion"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.provinceAndRegion}
                    >
                        <option value="">Province Or Region </option>
                        {
                            (formData.cityOrState !== "") && data.filter((city) => city.name === formData.cityOrState)[0].cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))
                        }
                    </select>

                    <p className="error" role="alert">
                        {(touched.provinceAndRegion || isStatus === STATUS.SUBMITTED) && errors.provinceAndRegion}
                    </p>

                </div>

                <div className='inputDivs d-flex'>
                    <label htmlFor="postalCode"> Postal code</label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Postal code"
                        onChange={handleChg}
                        onBlur={handleBlur}
                        value={formData.postalCode}
                    />
                    {/* <p className="error" role="alert">
                        {(touched.postalCode || isStatus === STATUS.SUBMITTED) && errors.postalCode}
                    </p> */}
                </div>



                <button
                    className="subBtn"
                    type="submit"
                    disabled={!(formData.fullName && formData.cityOrState && formData.email && formData.phone && formData.provinceAndRegion)}
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
