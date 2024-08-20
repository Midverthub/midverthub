'use client'
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function CategoriesSearch() {

    const STATUS = {
        IDLE: "IDLE",
        SUBMITTED: "SUBMITTED",
        SUBMITTING: "SUBMITTING",
        COMPLETED: "COMPLETED",
    };

    const [formData, setFormData] = React.useState({
        search: ""
    });

    const [isStatus, setStatus] = React.useState(STATUS.IDLE);
    const [touched, setTouched] = React.useState({});
    const [finish, setFinished] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null)

    const errors = getErrors();
    const isValid = Object.keys(errors).length === 0;

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus(STATUS.SUBMITTING);

        if (isValid) {
            // console.log("submit");
            setStatus(STATUS.COMPLETED);
            setFinished(prev => !prev)
            // console.log(formData);
        } else {
            setStatus(STATUS.SUBMITTED);
        }
    }

    function handleChg(e) {
        const { name, value, checked, type } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    const handleKey = (e) => {
        // search()
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

    function ValidateSearch(inputText) {
        var textformat = /^[A-Za-z]+$/;
        if (inputText.match(textformat)) {
            return true;
        }
        else {
            return false;
        }
    }


    function getErrors(params) {
        const result = {};

        if (!formData.email) {
            result.search = "Input text";
        } else if (!ValidateSearch(formData.search)) {
            result.search = "Search not found";
        }

        return result;
    }

    if (loginError) throw loginError

    return (


        <form

            className='categoriesSearch d-flex' action="" method="post">

            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />

            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search in Vehicles"
                className='homeSearchBar categoriesSearchBar'
                onChange={handleChg}
                onBlur={handleBlur}
                value={formData.search}
                onKeyDown={handleKey}
            />
            <p
                className="error" role="alert">
                {(touched.search || isStatus === STATUS.SUBMITTED) && errors.search}
            </p>

            {/* <button

                disabled={!isValid} onClick={handleSubmit} type="submit" value="Search"
                className={`submitinput-btn`}
            >
                SEARCH
            </button> */}

        </form>

    )

}

export default CategoriesSearch