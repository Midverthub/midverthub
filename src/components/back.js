'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

function Back() {

    const router = useRouter()
    return (
        <FontAwesomeIcon onClick={() => router.back()} icon={faAngleLeft} className="backIcon cursor" />
    )
}

export default Back