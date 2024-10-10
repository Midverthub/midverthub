import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


export default function ReshuffleLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <FontAwesomeIcon icon={faAngleLeft} className="backIcon" />

        <h3 className='subtitle2' >Reshuffle ads</h3>
      </div>

      {children}
    </section>
  )
}
