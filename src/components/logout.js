'use client'
import React from 'react'
import { logout } from '../../actions/auth'

function Logout() {
    return (
        <>
            <button onClick={() => logout()} className='sign-up-btn'>Logout</button>
        </>
    )
}

export default Logout