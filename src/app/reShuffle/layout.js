import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Back from '@/components/back';



export default function ReshuffleLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        {/* <FontAwesomeIcon icon={faAngleLeft} className="backIcon" /> */}
        <Back />

        <h3 className='subtitle2' >Reshuffle ads</h3>
      </div>

      {children}
    </section>
  )
}
