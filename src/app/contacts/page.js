import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link'
import Contact from '@/components/contact';

export default function Contacts() {


  return (

    <div className="height contactsDiv">

      <div className='contactsInnerDiv d-flex'>
        <h4 className='contactFollowpgh subtitle3 '>Followers (0)</h4>
        <h4 className='contactFollowpgh subtitle3 '>Following (0)</h4>
      </div>


      <div className='contactsContainer margin-t-b d-flex'>
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>

      <div className='contactLinkDiv d-flex'>
        <p className='subtitle1'> Invite someone</p>

        <button className='contactLinkBtn d-flex'>
          <p className='subtitle1'>
            Generate Link
          </p>
          <FontAwesomeIcon icon={faLink} className="iconSize2" />
        </button>

      </div>




    </div>

  )
}
