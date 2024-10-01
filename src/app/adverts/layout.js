import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


export default function AdvertsLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

        <h3 className='subtitle2' >Ongoing Adverts</h3>
      </div>

      {children}
    </section>
  )
}
