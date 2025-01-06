import './style.css'
import Back from '@/components/back';

export default function AdvertsLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <Back />

        <h3 className='subtitle2' >Ongoing Adverts</h3>
      </div>

      {children}
    </section>
  )
}
