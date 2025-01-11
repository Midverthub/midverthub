"use client"
import React from "react"
import axios from "axios"


export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}


export const AuthContext = React.createContext()


function AuthContextProvider({ children, session }) {

    const [isUser, setUser] = React.useState()
    const [isLoading, setIsLoading] = React.useState(REQUEST_STATUS.LOADING)
    const [error, setError] = React.useState(null)




    React.useEffect(() => {
        setIsLoading(REQUEST_STATUS.LOADING)
        async function getUser() {
            try {
                const response = await axios.get(`/api/auth/users/user?email=${session.user.email}`)
                setUser(response.data)
                setIsLoading(REQUEST_STATUS.SUCCESS)

            } catch (error) {
                setIsLoading(REQUEST_STATUS.FAILURE)
                setError(error)
            }
        }
        getUser()

    }, [session])


    return (
        <AuthContext.Provider value={{ isUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider