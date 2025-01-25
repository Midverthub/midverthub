"use client"
import React from "react"
import axios from "axios"


export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}


export const ProductContext = React.createContext()


function ProductContextProvider({ children }) {


    const localState = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("reshuffleProduct")) : null

    const [isProduct, setProduct] = React.useState(localState || null)

    React.useEffect(() => {

        localStorage.setItem("reshuffleProduct", JSON.stringify(isProduct));
    }, [isProduct]);

    const [isLoading, setIsLoading] = React.useState(REQUEST_STATUS.LOADING)
    const [error, setError] = React.useState(null)




    // React.useEffect(() => {
    //     setIsLoading(REQUEST_STATUS.LOADING)
    //     async function getUser() {
    //         try {
    //             const response = await axios.get(`/api/auth/users/user?email=${session.user.email}`)
    //             setIsLoading(REQUEST_STATUS.SUCCESS)
    //             setProduct(response.data)

    //         } catch (error) {
    //             setIsLoading(REQUEST_STATUS.FAILURE)
    //             setError(error)
    //         }
    //     }
    //     getUser()

    // }, [session])




    return (
        <ProductContext.Provider value={{ isProduct, setProduct, isLoading }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider