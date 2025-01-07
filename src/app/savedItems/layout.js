import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Back from '@/components/back';

export default function SavedItemsLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <Back />
        {/* <FontAwesomeIcon icon={faAngleLeft} className="backIcon" /> */}

        <h3 className='subtitle2' >Saved Adverts</h3>
      </div>

      {children}
    </section>
  )
}
