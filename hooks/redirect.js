import { AuthContext } from "../context/authContext";
import { redirect } from "next/navigation";
import { SessionContext } from "../context/sessionContext";

import React from 'react'

export default function Redirect() {

    const { isUser, isLoading } = React.useContext(AuthContext)
    const { session } = React.useContext(SessionContext)
    // console.log(isUser);



    function redirectFunc(params) {
        if (!session) {
            redirect('/login')
        }
    }


    return {
        redirectFunc
    }
}
