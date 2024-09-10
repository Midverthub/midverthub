'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import SearchpageSearch from '@/components/searchpageSearch';
import SearchItem from '@/components/searchItem';

import Image from 'next/image'
import Link from 'next/link'
import SearchHistoryItem from '@/components/searchHistoryItem';

export default function SignUp() {


  return (

    <div className="height seacrchDiv">
      <SearchpageSearch />

      <div className='searchHistroyDiv d-flex'>
        <h3 className='searchHistroyHeader'> Search History</h3>

        <button className='searchHistroyBtn'>Clear History</button>
      </div>

      <div className='searchHistoryItemsDiv d-flex'>

        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
        <SearchHistoryItem />
      </div>


      <p className='noHistoryPhg'>No History</p>

      <div className='searchitemsDiv d-flex '>

        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </div>

    </div>

  )
}
