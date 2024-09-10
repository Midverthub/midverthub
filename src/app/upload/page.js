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
    category: "",
    productLocation: "",
    productName: "",
    type: "",
    condition: "",
    description: "",
    price: "",
    negotiation: "",
    phone: "",
    email: "",
    update: ""
  });

  const [productImgs, setProductImgs] = React.useState([])

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

    setProductImgs((prevState) => {
      return [
        ...prevState, imgSrc
      ];
    });

  }
  console.log(productImgs);

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

    if (!formData.category) {
      result.category = "Category is required";
    }
    if (productImgs.length = 0) {
      result.productImgs = "Product Images are required";
    }
    if (!formData.productLocation) {
      result.productLocation = "Product Location is required";
    }
    if (!formData.productName) {
      result.productName = "Product Name is required";
    }
    if (!formData.type) {
      result.type = "Product Type is required";
    }
    if (!formData.condition) {
      result.condition = "Condition is required";
    }
    if (!formData.description) {
      result.description = "Product Description is required";
    }
    if (!formData.price) {
      result.price = "Product Price is required";
    }
    if (!formData.negotiation) {
      result.negotiation = "Is product negotiable?";
    }
    if (!formData.phone) {
      result.phone = "Please enter your phone number";
    }
    if (!formData.email) {
      result.email = "Email is required";
    } else if (!ValidateEmail(formData.email)) {
      result.email = "Email is not correct";
    }
    if (!formData.update) {
      result.update = "Are your information up to date?";
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
              <label htmlFor="category"> Select Category</label>

              <select
                name="category"
                id="category"
                onChange={handleChg}
                onBlur={handleBlur}
                value={formData.category}
              >

                <option value="c#">C#</option>
                <option value="C++">C++</option>
                <option value="erlang">Erlang</option>
              </select>

              <p className="error" role="alert">
                {(touched.category || isStatus === STATUS.SUBMITTED) && errors.category}
              </p>

            </div>

            <div className='inputDivs d-flex'>
              <label htmlFor="productImgs"> Add Photo</label>

              <input
                id="productImgs"
                style={{ display: "none" }}
                type="file"
                name="productImgs"
                // placeholder="Confirm Password"
                onChange={handleImgChg}
                onBlur={handleBlur}
              // value={formData.userPhoto}
              />

              <div className='inputFileDiv d-flex'>
                {productImgs.map((prod, ind) => (
                  <Image
                    key={ind}
                    width={70}
                    height={70}
                    src={window.URL.createObjectURL(prod)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt='Product Image'
                    style={{ objectFit: 'contain' }}

                  />
                ))
                }

                <label className='addImgLabel' htmlFor="productImgs" >
                  <div className='addImgDiv d-flex'>
                    <FontAwesomeIcon icon={faPlus} className='iconSize2' />
                    <span> Add More</span>
                  </div>
                </label>
              </div>

              <p className="error" role="alert">
                {(touched.productImgs || isStatus === STATUS.SUBMITTED) &&
                  errors.productImgs}
              </p>
            </div>

            <div className='uploadFormInnerDiv-1 d-flex'>

              <h3 className='subtitle-2'>Enter Details</h3>


              <div className='inputDivs d-flex'>
                <label htmlFor="productLocation"> Product Location</label>

                <select
                  name="productLocation"
                  id="productLocation"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.productLocation}
                >

                  <option value="c#">C#</option>
                  <option value="C++">C++</option>
                  <option value="erlang">Erlang</option>
                </select>

                <p className="error" role="alert">
                  {(touched.productLocation || isStatus === STATUS.SUBMITTED) && errors.productLocation}
                </p>

              </div>


              <div className='inputDivs d-flex'>
                <label htmlFor="productName"> Product Name</label>

                <input
                  type="text"
                  name="productName"
                  id="productName"
                  placeholder="Product Name"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.productName}
                />
                <p className="error" role="alert">
                  {(touched.productName || isStatus === STATUS.SUBMITTED) && errors.productName}
                </p>

              </div>

              <div className='inputDivs d-flex'>
                <label htmlFor="type"> Type</label>

                <select
                  name="type"
                  id="type"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.type}
                >

                  <option value="c#">C#</option>
                  <option value="C++">C++</option>
                  <option value="erlang">Erlang</option>
                </select>

                <p className="error" role="alert">
                  {(touched.type || isStatus === STATUS.SUBMITTED) && errors.type}
                </p>

              </div>


              <div className='inputDivs d-flex'>
                <label htmlFor="condition"> Condition</label>
                <input
                  type="text"
                  name="condition"
                  id="condition"
                  placeholder="Used"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.condition}
                />
                <p className="error" role="alert">
                  {(touched.condition || isStatus === STATUS.SUBMITTED) && errors.condition}
                </p>

              </div>

              <div className="textarea-div">
                <label htmlFor="description">Description</label>

                <textarea id="description" name="description" className="textarea" placeholder="Type a message" onChange={handleChg} onBlur={handleBlur} value={formData.description} />

                <p className="error" role="alert">
                  {(touched.description || isStatus === STATUS.SUBMITTED) && errors.description}
                </p>
              </div>

              <div className='inputDivs d-flex'>
                <label htmlFor="price"> Price</label>

                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Enter Price"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.price}
                />
                <p className="error" role="alert">
                  {(touched.price || isStatus === STATUS.SUBMITTED) && errors.price}
                </p>

              </div>

            </div>


            <div className='uploadRadioDiv d-flex'>
              <h3 className='uploadRadioHeader'>Are you opened for negotiation</h3>

              <div className='uploadRadioInnerDiv d-flex'>

                <div className='uploadRadioInnerDiv-1 d-flex'>
                  <input
                    type="radio"
                    id="yes"
                    name="negotiation"
                    onChange={handleChg}
                    checked={formData.negotiation === "yes"}
                    value="yes"
                    className='radioInput'
                  />
                  <label className='radioBtnLabel' htmlFor="yes">Yes</label>
                </div>

                <div className='uploadRadioInnerDiv-1 d-flex'>
                  <input
                    type="radio"
                    id="no"
                    name="negotiation"
                    onChange={handleChg}
                    checked={formData.negotiation === "no"}
                    value="no"
                    className='radioInput'
                  />
                  <label className='radioBtnLabel' htmlFor="no"> No</label>
                </div>

              </div>

            </div>
          </div>

          <div className='uploadInnerDiv-2 padding d-flex'>
            <h3 className='subtitle-2'>Confirm your contact details?</h3>

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



            <div className=' uploadRadioDiv '>

              <div className='uploadRadioDiv d-flex'>
                <h3 className='uploadRadioHeader'>Are these details up to date?</h3>

                <div className='uploadRadioInnerDiv d-flex'>

                  <div className='uploadRadioInnerDiv-1 d-flex'>
                    <input
                      type="radio"
                      id="yes"
                      name="update"
                      onChange={handleChg}
                      checked={formData.update === "yes"}
                      value="yes"
                      className='radioInput'
                    />
                    <label className='radioBtnLabel' htmlFor="yes">Yes</label>
                  </div>

                  <div className='uploadRadioInnerDiv-1 d-flex'>
                    <input
                      type="radio"
                      id="no"
                      name="update"
                      onChange={handleChg}
                      checked={formData.update === "no"}
                      value="no"
                      className='radioInput'
                    />
                    <label className='radioBtnLabel' htmlFor="no"> No</label>
                  </div>

                </div>

              </div>
            </div>
          </div>



          <button
            className="subBtn padding-l-r"
            type="submit"
          // disabled={!(formData.email || formData.password || formData.passwordCheck)}
          >
            {/* <Link className='links' href="/signup/"> */}
            Upload
            {/* </Link> */}
          </button>

        </form>

      </div>



    </div>

  )
}
