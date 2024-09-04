'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';


import Image from 'next/image'
import Link from 'next/link'
import { faCross, faPlus } from '@fortawesome/free-solid-svg-icons';

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

    <div>

      <div className="formDiv d-flex">

        <p className='sub-title-1 padding-l-r'>Edit Upload</p>

        <form className=' form d-flex' onSubmit={handleSubmit}>
          <div className='uploadFormInnerDiv d-flex padding'>

            <div className='inputDivs d-flex '>
              <label htmlFor="email"> Select Category</label>

              <select
                name="email"
                id="email"
                onChange={handleChg}
                onBlur={handleBlur}
                value={formData.email}
              >

                <option value="c#">C#</option>
                <option value="C++">C++</option>
                <option value="erlang">Erlang</option>
              </select>

              <p className="error" role="alert">
                {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
              </p>

            </div>

            <div className='inputDivs d-flex'>
              <label htmlFor="email"> Add Photo</label>

              <input
                id="userPhoto"
                style={{ display: "none" }}
                type="file"
                name="userPhoto"
                // placeholder="Confirm Password"
                onChange={handleChg}
                onBlur={handleBlur}
                value={formData.userPhoto}
              />

              <label htmlFor="userPhoto" >
                <div className='addImgDiv d-flex'>
                  <FontAwesomeIcon icon={faPlus} className='iconSize2' />
                  <span> Add photos</span>
                </div>
              </label>

              <p className="error" role="alert">
                {(touched.userPhoto || isStatus === STATUS.SUBMITTED) &&
                  errors.userPhoto}
              </p>
            </div>

            <div className='uploadFormInnerDiv-1 d-flex'>

              <h3 className='subtitle-2'>Enter Details</h3>


              <div className='inputDivs d-flex'>
                <label htmlFor="email"> Product Location</label>

                <select
                  name="email"
                  id="email"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.email}
                >

                  <option value="c#">C#</option>
                  <option value="C++">C++</option>
                  <option value="erlang">Erlang</option>
                </select>

                <p className="error" role="alert">
                  {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
                </p>

              </div>


              <div className='inputDivs d-flex'>
                <label htmlFor="email"> Product Name</label>

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
                <label htmlFor="email"> Type</label>

                <select
                  name="email"
                  id="email"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.email}
                >

                  <option value="c#">C#</option>
                  <option value="C++">C++</option>
                  <option value="erlang">Erlang</option>
                </select>

                <p className="error" role="alert">
                  {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
                </p>

              </div>


              <div className='inputDivs d-flex'>
                <label htmlFor="email"> Condition</label>
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

              <div className="textarea-div">
                <label htmlFor="email">Description</label>

                <textarea name="message" className="textarea" placeholder="Type a message" onChange={handleChg} value={formData.message} />

                <p className="error" role="alert">
                  {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
                </p>
              </div>

              <div className='inputDivs d-flex'>
                <label htmlFor="email"> Price</label>

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

            </div>


            <div className='uploadRadioDiv d-flex'>
              <h3 className='uploadRadioHeader'>Are you opened for negotiation</h3>

              <div className='uploadRadioInnerDiv d-flex'>

                <div className='uploadRadioInnerDiv-1 d-flex'>
                  <input
                    type="radio"
                    id="categoryTwo"
                    name="priceCategory"
                    onChange={handleChg}
                    checked={formData.priceCategory === "categoryTwo"}
                    value="categoryTwo"
                    className='radioInput'
                  />
                  <label htmlFor="isFriendly">Yes</label>
                </div>

                <div className='uploadRadioInnerDiv-1 d-flex'>
                  <input
                    type="radio"
                    id="categoryTwo"
                    name="priceCategory"
                    onChange={handleChg}
                    checked={formData.priceCategory === "categoryTwo"}
                    value="categoryTwo"
                    className='radioInput'
                  />
                  <label htmlFor="isFriendly"> No</label>
                </div>

              </div>

            </div>
          </div>

          <div className='uploadInnerDiv-2 padding d-flex'>
            <h3 className='subtitle-2'>Confirm your contact details?</h3>

            <div className='inputDivs d-flex'>
              <label htmlFor="email"> Phone</label>
              <input
                type="tel"
                name="email"
                id="email"
                placeholder=""
                onChange={handleChg}
                onBlur={handleBlur}
                value={formData.email}
              />
              <p className="error" role="alert">
                {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
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



            <div className=' uploadRadioDiv '>

              <div className='uploadRadioDiv d-flex'>
                <h3 className='uploadRadioHeader'>Are these details up to date?</h3>

                <div className='uploadRadioInnerDiv d-flex'>

                  <div className='uploadRadioInnerDiv-1 d-flex'>
                    <input
                      type="radio"
                      id="categoryTwo"
                      name="priceCategory"
                      onChange={handleChg}
                      checked={formData.priceCategory === "categoryTwo"}
                      value="categoryTwo"
                      className='radioInput'
                    />
                    <label htmlFor="isFriendly">Yes</label>
                  </div>

                  <div className='uploadRadioInnerDiv-1 d-flex'>
                    <input
                      type="radio"
                      id="categoryTwo"
                      name="priceCategory"
                      onChange={handleChg}
                      checked={formData.priceCategory === "categoryTwo"}
                      value="categoryTwo"
                      className='radioInput'
                    />
                    <label htmlFor="isFriendly"> No</label>
                  </div>

                </div>

              </div>
            </div>
          </div>



          <button
            className="subBtn padding-l-r"
            type="submit"
            disabled={!(formData.email || formData.password || formData.passwordCheck)}
          >
            <Link className='links' href="/signup/">
              Continue
            </Link>
          </button>

        </form>

      </div>



    </div>

  )
}
