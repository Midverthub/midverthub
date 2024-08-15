'use client'
import Category from '../components/category'
import BackBtn from '../components/backBtn'
import LayoutAbout from '../components/layout-about'
import { motion } from 'framer-motion'
import { Manrope } from 'next/font/google'


const inter = Manrope({ subsets: ['latin'] })

export default function ProductsLayout({ children }) {
    return (
        <>
            <section className={inter.className}>
                <BackBtn />
                <div>
                    {children}
                </div>

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 2 % 2 === 0 ? 50 : -50
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}
                    className='header-category-margin'>
                    <Category />
                </motion.div>

            </section>

            <motion.div
                initial={{
                    opacity: 0,
                    x: 2 % 2 === 0 ? 50 : -50
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 1
                    }
                }}
                viewport={{ once: true }}
            >
                <LayoutAbout />
            </motion.div>

        </>
    )
}
