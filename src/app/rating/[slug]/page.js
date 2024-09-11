'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image'
import Link from 'next/link'
import ItemToRate from '@/components/itemToRate';

export default function Rating() {


    return (

        <div className="height ratingDiv">
            <ItemToRate />


        </div>

    )
}
