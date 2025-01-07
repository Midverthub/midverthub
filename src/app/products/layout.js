import { Manrope } from 'next/font/google'
import "./style.css"


const inter = Manrope({ subsets: ['latin'] })

export default function ProductsLayout({ children }) {
    return (
        <>
            <section className={inter.className}>

                <div>
                    {children}
                </div>

            </section>
        </>
    )
}
