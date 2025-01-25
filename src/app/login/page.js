'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faApple } from '@fortawesome/free-brands-svg-icons';
import { useFormStatus } from 'react-dom'
import { AuthContext } from '../../../context/authContext';
import { SessionContext } from '../../../context/sessionContext';
import Loading from '../../loading';
import { redirect } from 'next/navigation';

import Image from 'next/image'
import Link from 'next/link'
import { getUserByEmail, getUsers, login, loginWithCredentials } from '../../../actions/auth';

export default function SignUp() {

  const { isUser, isLoading } = React.useContext(AuthContext)
  const { session } = React.useContext(SessionContext)

  if (session) {
    redirect('/')
  }


  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const { pending } = useFormStatus()


  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [isStatus, setStatus] = React.useState(STATUS.IDLE);
  const [touched, setTouched] = React.useState({});
  // const [finish, setFinished] = React.useState(false);
  const [loginError, setLoginError] = React.useState('')

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

  // async function nameit(params) {

  //   const user = await getUserByEmail(isUser.user.email);
  //   // const user = await getUserByEmail("ajayifiyin41@gmail.com");
  //   console.log(user);


  //   const users = await getUsers()
  //   console.log(users);
  // }
  // nameit()

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);

    if (isValid) {
      // console.log("submit");
      //here we are finding the user by email in the database
      // const user = getUserByEmail(formData.email)
      const user = await getUserByEmail(formData.email);

      if (!user) {
        setLoginError("User not found")
        setStatus(STATUS.IDLE);
        return
      }
      else {
        //login with credentials
        setStatus(STATUS.SUBMITTING);
        loginWithCredentials(formData.email, formData.password)
      }


      setStatus(STATUS.COMPLETED);

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


  if (isStatus === "SUBMITTING" || isLoading === 'loading') return (<Loading />)


  return (
    <div className='loginPage d-flex'>

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
          <p className="error" role="alert">
            {(loginError !== "") &&
              loginError}
          </p>

          <div className='inputDivs d-flex'>

            <p className="error" role="alert">
              {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
            </p>

            <input
              type="email"
              name="email"
              id='Email'
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
              type={formData.showPassword ? "text" : "password"}
              name="password"
              id='Password'
              placeholder="Password"
              onChange={handleChg}
              onBlur={handleBlur}
              value={formData.password}
            />
            <sub className='forgotPassword'>Forgot Password?</sub>

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


          <button
            className="subBtn"
            type="submit"
            disabled={!(formData.email || formData.password || formData.passwordCheck || pending)}
          >
            {pending ? "Loading..." : "Login"}
          </button>

        </form>

      </div>

      <div className='otherFormDIv d-flex'>

        {/* <div className='separatorDiv d-flex'>

          <div className='separator'></div>

          <p className='separatorPgh'>
            or
          </p>

          <div className='separator'></div>
        </div> */}


        {/* come back to this */}
        {/* <div className="otherSignUpDiv d-flex">
          <button onClick={() => login('google')} className='otherSignUpBtn d-flex'>
            <FontAwesomeIcon icon={faGoogle} className='iconSize2' />

            <p>Sign in with Google</p>
          </button>

          <button onClick={() => login('github')} className='otherSignUpBtn d-flex'>
            <FontAwesomeIcon icon={faGithub} className='iconSize2' />

            <p>Sign in with Github</p>
          </button>
        </div> */}


        <div className="otherSignUpDiv d-flex">
          <Link className="links" href="/signup">

            <p className='signupPgh'>
              Don&apos;t have an account? Sign up now!
            </p>
          </Link>
        </div>
      </div>

    </div >
  );
}
