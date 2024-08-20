'use client'
// import axios from 'axios'
import Image from 'next/image';
import CategoryProduct from '@/app/components/category-product';
import useProductsDataManager from '@/hooks/useProductsDataManager';
import { motion } from 'framer-motion'


export default function ProductsCategories({ params }) {

    const { isLoading, productLists, iserror, dispatch } = useProductsDataManager()

    console.log(params.slug);

    const filteredObjects = productLists.filter(obj => obj.category === params.slug);


    if (isLoading) {
        return (


            <div className="loading-div">

                <Image
                    src="/assets/loading.gif"
                    width="200"
                    height="200"
                    alt="loading"

                />
            </div>
        )
    }
    return (
        <>
            <header className='category-header'>
                {params.slug}
            </header>

            <div className='d-flex category-product-container' >
                {
                    filteredObjects.map((map, index) => (
                        <motion.div key={map.id}

                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? 50 : -50
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 1
                                }
                            }}
                            viewport={{ once: true }}>

                            <CategoryProduct index={index + 1} key={map.id} slugs={params.slug} {...map} />
                        </motion.div>
                    ))
                }
            </div>
        </>
    )
}