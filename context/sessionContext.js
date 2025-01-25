"use client"
import React from "react"


export const SessionContext = React.createContext()


function SessionContextProvider({ children, session }) {


    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider