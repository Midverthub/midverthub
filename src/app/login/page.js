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
    email: "",
    password: "",
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

    const email = e.target.email.value
    const password = e.target.password.value

    console.log(email, password,)

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

  function CheckPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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

    if (!formData.password) {
      result.password = "Please enter Password";
    } else if (!CheckPassword(formData.password)) {
      result.password = "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    }
    return result;
  }

  if (loginError) throw loginError


  if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


  return (
    <div cn>

      <div className='loginBackgroundImgDiv d-flex'>

        {/* <Image
          fill
          src="/assets/loginBackgroundImage.png"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt='Login Banner'
          style={{ objectFit: 'contain' }}

        /> */}

        <div className='loginBackgroundDiv d-flex'>
          <Image
            width={109}
            height={50}
            src="/assets/logo.svg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='Share'
            style={{ objectFit: 'contain' }}

          />
          <p>
            Sign up to start posting your ads and reach more potential buyers today!
          </p>
        </div>
      </div>

      <div className="formDiv d-flex">

        <p className='login-pgh'>Welcome Back!</p>

        <form className=' form d-flex' onSubmit={handleSubmit}>

          <div className='inputDivs d-flex'>

            <p className="error" role="alert">
              {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
            </p>

            <input
              type="text"
              name="email"
              placeholder="Email address"
              onChange={handleChg}
              onBlur={handleBlur}
              value={formData.email}
            />


          </div>

          <div className='inputDivs d-flex'>
            <p className="error" role="alert">
              {(touched.password || isStatus === STATUS.SUBMITTED) &&
                errors.password}
            </p>

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChg}
              onBlur={handleBlur}
              value={formData.password}
            />
            <sub className='forgotPassword'>Forgot Password?</sub>


          </div>


          <button
            className="subBtn"
            type="submit"
            disabled={!(formData.email || formData.password || formData.passwordCheck)}
          >
            Login
          </button>

        </form>

      </div>
      <div className='otherFormDIv d-flex'>

        <div className='separatorDiv d-flex'>
          <div className='separator'></div>
          <p className='SeparatorPgh'>
            or
          </p>
          <div className='separator'></div>
        </div>

        <div className="otherSignUpDiv d-flex">
          <Link className="links" href="/signup">
            <button className='otherSignUpBtn d-flex'>
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>
    </div>

  )
}
