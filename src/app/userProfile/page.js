'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'

import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../../context/authContext';
import Loading from '@/loading'
import Redirect from '../../../hooks/redirect';


export default function UserProfile() {
  const { redirectFunc } = Redirect()

  redirectFunc()

  const { isUser, isLoading } = React.useContext(AuthContext)
  console.log(isUser);


  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const [formData, setFormData] = React.useState({

    firstName: "",
    lastName: "",
    location: "",
    phone: "",
    email: "",
  });

  const [userImg, setUserImg] = React.useState("")

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

  function handleImgChg(e) {
    // console.log(e.target.files[0].name);
    const imgSrc = e.target.files[0]
    // console.log(imgSrc);

    setUserImg(imgSrc);
  }

  // console.log(userImg);

  if (userImg.length === 0) {
    // console.log("empty");
  } else {
    // console.log("there is something here");
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
      // console.log("submit");
      setStatus(STATUS.COMPLETED);
      // setFinished(prev => !prev)
      // console.log(formData);
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

  function getErrors(params) {
    const result = {}

    // if (userImg.length === "") {
    //   result.userImg = "Product Images are required";
    // }

    if (!formData.firstName) {
      result.firstName = "First Name is required";
    }

    if (!formData.lastName) {
      result.lastName = "Last Name is required";
    }

    if (!formData.location) {
      result.location = "Location is required";
    }
    if (!formData.phone) {
      result.phone = "Please enter your phone number";
    }
    if (!formData.email) {
      result.email = "Email is required";
    } else if (!ValidateEmail(formData.email)) {
      result.email = "Email is not correct";
    }

    return result;
  }

  if (loginError) throw loginError


  if (isLoading === "loading" || isStatus === "SUBMITTING") return (<Loading />)





  return (

    // <div className=" height formDiv d-flex">

    <form className=' form userProfileform  d-flex padding' onSubmit={handleSubmit}>

      <div className='inputDivs d-flex'>
        <input
          id="userImg"
          style={{ display: "none" }}
          type="file"
          name="userImg"
          // placeholder="Confirm Password"
          onChange={handleImgChg}
          onBlur={handleBlur}
        // value={formData.userPhoto}
        />

        <div className='userImgDiv d-flex'>
          <Image
            width={100}
            height={100}
            src={userImg.length !== 0 ? window.URL.createObjectURL(userImg) : "/assets/userProfileImg.jpeg"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt='Userprofile image'
            style={{ objectFit: 'cover' }}
          />

          <label className='addUserImgLabel d-flex' htmlFor="userImg" >
            <div className='addImgDiv d-flex'>
              <FontAwesomeIcon icon={faImage} className='iconSize2' />
            </div>
          </label>
        </div>

        {/* <p className="error" role="alert">
          {(touched.productImgs || isStatus === STATUS.SUBMITTED) &&
            errors.productImgs}
        </p> */}
      </div>


      <div className='inputDivs d-flex'>
        <label htmlFor="firstName">Name</label>

        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          onChange={handleChg}
          onBlur={handleBlur}
          value={formData.firstName}
        />
        <p className="error" role="alert">
          {(touched.firstName || isStatus === STATUS.SUBMITTED) && errors.firstName}
        </p>

      </div>

      {/* <div className='inputDivs d-flex'>
        <label htmlFor="lastName"> Last Name</label>

        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          onChange={handleChg}
          onBlur={handleBlur}
          value={formData.lastName}
        />
        <p className="error" role="alert">
          {(touched.lastName || isStatus === STATUS.SUBMITTED) && errors.lastName}
        </p>

      </div> */}

      <div className='inputDivs d-flex'>
        <label htmlFor="location"> Type</label>

        <select
          name="location"
          id="location"
          onChange={handleChg}
          onBlur={handleBlur}
          value={formData.location}
        >

          <option value="">Select Loaction</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
          <option value="erlang">Erlang</option>
        </select>

        <p className="error" role="alert">
          {(touched.location || isStatus === STATUS.SUBMITTED) && errors.location}
        </p>

      </div>


      <div className='inputDivs d-flex'>
        <label htmlFor="phone"> Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="+234 1234 5678"
          onChange={handleChg}
          onBlur={handleBlur}
          value={formData.phone}
        />
        <p className="error" role="alert">
          {(touched.phone || isStatus === STATUS.SUBMITTED) && errors.phone}
        </p>

      </div>

      <div className='inputDivs d-flex'>
        <label htmlFor="email"> E-mail</label>
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



      <button
        className="subBtn padding-l-r"
        type="submit"
      // disabled={!(formData.email || formData.password || formData.passwordCheck)}
      >
        {/* <Link className='links' href="/signup/"> */}
        Update
        {/* </Link> */}
      </button>

      {/* <div class="straightLine"></div> */}
      <div class="straightLine"></div>


    </form>

    // </div>


  )
}
