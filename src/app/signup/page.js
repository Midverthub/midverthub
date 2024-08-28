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
    passwordCheck: "",
    showPassword: false,
    staySignedIn: false,

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

    if (!formData.passwordCheck) {
      result.passwordCheck = "Please confirm Password";
    } else if (!formData.passwordCheck.match(formData.password)) {
      result.passwordCheck = "Password doesn't match";
    }

    // if (!formData.userPhoto) result.userPhoto = "Select a Picture"
    return result;
  }

  if (loginError) throw loginError


  if (isStatus === "SUBMITTING") return (<div className="container">...LOADING</div>)


  return (


    <div className="formDiv d-flex">

      <p className='login-pgh'>Sign Up</p>

      <form className=' form d-flex' onSubmit={handleSubmit}>

        <div>

          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={handleChg}
            onBlur={handleBlur}
            value={formData.email}
          />
          <p className="error" role="alert">
            {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
          </p>

        </div>

        <div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChg}
            onBlur={handleBlur}
            value={formData.password}
          />
          <p className="error" role="alert">
            {(touched.password || isStatus === STATUS.SUBMITTED) &&
              errors.password}
          </p>

        </div>

        <div>

          <input
            type="password"
            name="passwordCheck"
            placeholder="Repeat Password"
            onChange={handleChg}
            onBlur={handleBlur}
            value={formData.passwordCheck}
          />
          <p className="error" role="alert">
            {(touched.passwordCheck || isStatus === STATUS.SUBMITTED) &&
              errors.passwordCheck}
          </p>

        </div>

        <div className='checkboxDiv d-flex'>
          <input
            className='checkbox'
            type="checkbox"
            id="showPassword"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChg}
          />
          <label htmlFor="isFriendly">Show Password?</label>
        </div>

        <div className='checkboxDiv d-flex'>
          <input
            className='checkbox'
            type="checkbox"
            id="staySignedIn"
            name="staySignedIn"
            checked={formData.staySignedIn}
            onChange={handleChg}
          />
          <label htmlFor="isFriendly"> Stay signed in?</label>
        </div>

        <button
          className="subBtn"
          type="submit"
          disabled={!(formData.email || formData.password || formData.passwordCheck)}
        >
          Continue
        </button>

      </form>

      <p> Or sign up with </p>

      <div className="otherSignUpDiv d-flex">
        <button className='otherSignUpBtn d-flex'>
          <FontAwesomeIcon icon={faGoogle} className='iconSize2' />

          <p>Sign Up with Google</p>
        </button>

        <button className='otherSignUpBtn d-flex'>
          <FontAwesomeIcon icon={faApple} className='iconSize2' />

          <p>Sign Up with Apple</p>
        </button>
      </div>

      <Link className="links" href="/login">
        <p className="signup-link">
          Already have an account?
        </p>
      </Link>

    </div>

  )
}
