'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import Loading from '@/loading';
// import { useRouter } from 'next/router';
import axios from 'axios';

import Image from 'next/image'
import Link from 'next/link'
import { faCross, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../context/authContext';

export default function SignUp() {

  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  // const router = useRouter()

  const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);


  const [formData, setFormData] = React.useState({
    category: "",
    cityOrState: "" || isUser ? (isUser.state) : "",
    provinceAndRegion: "" || isUser ? (isUser.town) : "",
    productName: "",
    // type: "",
    condition: "",
    description: "",
    price: "",
    negotiation: "",
    phone: "" || isUser ? (isUser.phone) : "",
    email: "" || isUser ? (isUser.email) : "",
    update: ""
  });


  const [data, setData] = React.useState(null)

  const [isStatus, setStatus] = React.useState(STATUS.IDLE);
  const [touched, setTouched] = React.useState({});

  const [productImgs, setProductimgs] = React.useState([])
  const [uploadSingleFile, setUploadSingleFile] = React.useState(null)
  // const [imageUrl, setImageUrl] = React.useState(null)
  const [singleimage64, setsingleImage64] = React.useState(null)
  const [image64, setImage64] = React.useState([])
  // const [finish, setFinished] = React.useState(false);
  const [isError, setisError] = React.useState(null)

  React.useEffect(() => {

    setStatus(STATUS.SUBMITTING)
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data)).finally(() => {
        setStatus(STATUS.COMPLETED);

      })
      .catch(error => console.error('Error fetching data:', error));

  }, [STATUS.COMPLETED, STATUS.SUBMITTING]);

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
    setUploadSingleFile(e.target.files[0])

    // console.log(e.target.files[0].name);


    //pushing the image to the productImgs array
    const imgSrc = e.target.files[0]
    setProductimgs((prevState) => {
      return [
        ...prevState, imgSrc
      ];
    });

    const file = e.target.files
    const promise = new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => res(reader.result);
      reader.onerror = (error) => rej(error);
    })

    Promise.resolve(promise).then((imgFile) => {
      // console.log(imgFile);
      setsingleImage64(imgFile)
      setImage64((prevState) => {
        return [
          ...prevState, imgFile
        ];
      })
    })


    // using URL.createObjectURL to convert the image to a url
    // const url = window.URL.createObjectURL(imgSrc);
    // setImageUrl((prevState) => {
    //   return [
    //     ...prevState, url
    //   ];
    // });

  }

  React.useEffect(() => {
    // console.log(productImgs);
    // console.log(imageUrl);
    // console.log(image64);
  }, [image64]);

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

    if (isValid) { //isValid
      // if (isValid) { //isValid

      // console.log("submit");
      // console.log(productImgs);
      // console.log(uploadSingleFile);
      // console.log(singleimage64);
      // console.log(image64);
      // console.log(formData);


      try {
        const res = await fetch("/api/imageUpload", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },

          body: JSON.stringify({ files: image64 })
        }).then(async (res) => {
          const data = await res.json()
          // console.log(data);
          const res2 = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: isUser.id,
              category: formData.category,
              cityOrState: formData.cityOrState,
              provinceAndRegion: formData.provinceAndRegion,
              productName: formData.productName,
              condition: formData.condition,
              description: formData.description,
              price: formData.price,
              negotiation: formData.negotiation,
              phone: formData.phone,
              email: formData.email,
              update: formData.update,
              images: data
            }),
          });
          if (res2.ok) {
            // console.log("Product Uploaded");
            // console.log(await res2.json());
            setisError("");
            // router.push('/');

          } else {
            // console.log("Product Upload failed, try again");
            // console.log(res2);
            // console.log(await res2.json());
          }
        })

        // if (res.ok) {
        //   const data = await res.json()
        //   console.log(data);
        // try {
        //   const res = await fetch("/api/products", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       userId: isUser.id,
        //       category: formData.category,
        //       cityOrState: formData.cityOrState,
        //       provinceAndRegion: formData.provinceAndRegion,
        //       productName: formData.productName,
        //       condition: formData.condition,
        //       description: formData.description,
        //       price: formData.price,
        //       negotiation: formData.negotiation,
        //       phone: formData.phone,
        //       email: formData.email,
        //       update: formData.update,
        //       images: data
        //     }),
        //   });

        // if (res.status === 400) {
        //   setisError("Product Upload failed, try again");

        // }
        // if (res.status === 200) {
        //   console.log("Product Uploaded");
        //   console.log(await res.json());
        //   setisError("");
        //   // router.push('/');
        // }

        // } catch (error) {
        //   console.log(error);
        //   setisError("Something went wrong, try again");
        // }
        // }

      } catch (error) {
        // console.log(error);
      }

      setStatus(STATUS.COMPLETED);
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

    // if (productImgs.length = 0) {
    //   result.productImgs = "Product Images are required";
    // }

    if (!formData.cityOrState) {
      result.cityOrState = "City or State is required";
    }

    if (!formData.provinceAndRegion) {
      result.provinceAndRegion = "Province or Region is required";
    }

    if (!formData.productName) {
      result.productName = "Product Name is required";
    }

    // if (!formData.type) {
    //   result.type = "Product Type is required";
    // }

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
  const category = ["Vehicles", "Real Estate", "Phones & Gadgets", "Fashion", "Electronics", "Home Furniture & Appliances", "Health & Beauty", "Books & Games", "Electricals", "Sports", "Services", "Animals & Pets", "Children / kids", "Industrial & Commercial equipment", "Others"]

  if (isError) throw isError


  if (isStatus === "SUBMITTING" || isLoading === "loading") return (<Loading />)


  return (

    <div>

      <div className="formDiv d-flex">

        <p className='subtitle2 padding-l-r'>Edit Upload</p>

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

                <option value="">Select a category</option>
                {category.map((cat, ind) => (
                  <option key={ind} value={cat}>{cat}</option>
                )
                )}
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
                disabled={productImgs.length === 5}
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
              {/* <h6>you can only upload 5 images</h6> */}

              <p className="error" role="alert">
                {(touched.productImgs || isStatus === STATUS.SUBMITTED) &&
                  errors.productImgs}
              </p>
            </div>

            <div className='uploadFormInnerDiv-1 d-flex'>

              <h3 className='subtitle2'>Enter Details</h3>

              <div className='productloactionDiv d-flex'>
                <h3 className='subtitle-2 productLocationHeader'>Product Location</h3>

                <div className='productloactionDivInner d-flex'>

                  <div className='inputDivs d-flex'>
                    <label htmlFor="cityOrState"> City Or State</label>

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
                    <label htmlFor="provinceAndRegion"> Province OR Region</label>

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
                </div>

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

              {/* <div className='inputDivs d-flex'>
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

              </div> */}

              <div className='inputDivs d-flex'>
                <label htmlFor="condition"> Condition</label>

                <select
                  name="condition"
                  id="condition"
                  onChange={handleChg}
                  onBlur={handleBlur}
                  value={formData.condition}
                >

                  <option value="">Select a Condition</option>
                  <option value="Brand New">Brand New</option>
                  <option value="Foreign Used">Foreign Used</option>
                  <option value="Local Used">Local Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>

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

              <p className="error" role="alert">
                {(touched.negotiation || isStatus === STATUS.SUBMITTED) && errors.negotiation}
              </p>

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
            disabled={!(formData.category || formData.cityOrState || formData.provinceAndRegion || formData.productName || formData.type || formData.condition || formData.description || formData.price || formData.returnPolicy || formData.payment || formData.negotiation || formData.phone || formData.email || formData.update)}
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
