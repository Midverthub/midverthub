'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

import { useRouter } from 'next/navigation';
import Loading from '../../../loading';


import { AuthContext } from '../../../../context/authContext';
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {

    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };

    const router = useRouter()

    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser.id);


    const [formData, setFormData] = React.useState({

        fullName: "",
        email: "",
        phone: 0,
        cityOrState: "",
        provinceAndRegion: "",
        postalCode: 0

    });

    const [data, setData] = React.useState(null);
    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});
    // const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)
    const [locationIndex, setlocationIndex] = React.useState()

    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    React.useEffect(() => {

        setStatus(STATUS.SUBMITTING)
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setData(data)).finally(() => {
                setStatus(STATUS.COMPLETED);

            })
            .catch(error => console.error('Error fetching data:', error));

    }, [STATUS.COMPLETED, STATUS.SUBMITTING]);


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

        setStatus(STATUS.SUBMITTING);

        if (isValid) {
            console.log("submit");
            try {
                const res = await fetch("/api/auth/users", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: isUser.id,
                        name: formData.fullName,
                        phone: formData.phone,
                        state: formData.cityOrState,
                        lga: formData.provinceAndRegion,
                        postalcode: formData.postalCode
                    }),
                });

                if (res.status === 400) {
                    setLoginError("User already exists");

                }
                if (res.status === 200) {
                    setLoginError("");
                    router.push('/');
                }

            } catch (error) {
                console.log(error);
                setLoginError("Something went wrong, try again");
            }
            setStatus(STATUS.COMPLETED);

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
        var number = /^(\+?\d{1,4})?\s?\d{7,14}$/;
        if (inputtxt.match(number)) {
            return true;
        }
        else {
            return false;
        }
        // return true
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
        } else if (!CheckPhone(formData.phone)) {
            result.phone = "Phone Number cannot contian letters";
        }

        if (!formData.postalCode) {
            result.postalCode = "Postal code is required";
        } else if (!CheckZip(formData.postalCode)) {
            result.postalCode = "Postal code cannot contain special charaters or letters";
        }

        if (!formData.cityOrState) {
            result.cityOrState = "City or State is required";
        }

        if (!formData.provinceAndRegion) {
            result.provinceAndRegion = "Province or Region is required";
        }


        return result;
    }

    if (loginError) throw loginError


    if (isStatus === "SUBMITTING" || isLoading === "loading") return (<Loading />)

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
