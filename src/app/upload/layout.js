import './style.css'
import Back from '@/components/back'

export default function SignUpLayout({ children }) {
  return (
    <section>
      <div className='subHeaderDiv d-flex padding'>
        <Back />
        {/* <FontAwesomeIcon icon={faAngleLeft} className="backIcon" /> */}

        <h3 className='subtitle2' >Saved Items</h3>
      </div>

      {children}
    </section>
  )
}
