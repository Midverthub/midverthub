import './style.css'
import Back from '@/components/back';
export default function ContactsLayout({ children }) {
  return (
    <section>

      <div className='subHeaderDiv d-flex padding'>
        <Back />

        <h3 className='subtitle2' >Contacts</h3>
      </div>

      {children}
    </section>
  )
}
