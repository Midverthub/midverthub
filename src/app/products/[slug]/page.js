'use client'
import React from 'react';
import useProductsDataManager from '@/hooks/useProductsDataManager';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '@/app/contexts/cartContext';
import { motion } from 'framer-motion'




export default function Product({ params }) {

    const { data, dispatch } = React.useContext(CartContext)

    const { isLoading, productLists, iserror } = useProductsDataManager()

    const res = productLists.filter(obj => obj.slug === params.slug);

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

    function disable(id) {
        const resp = data.filter(obj => obj.id === res[0].id);

        return resp
    }


    return (
        <div className='d-flex category-product-container'>

            <div className="product-info-div" >
                <div className='product-img-title-div'>
                    <motion.div
                        className='category-product-image-bg-2 d-flex'
                        initial={{
                            opacity: 0,
                            y: -200
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1,
                                staggerChildren: 2,
                                delayChildren: 1
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={res[0].categoryImage.desktop}
                            alt={res[0].categoryImage.desktop}
                            width={100}
                            height={100}
                            className='category-product-image-2'
                        />
                    </motion.div>

                    <motion.div className='product-cart-info-div'
                        initial={{
                            opacity: 0,
                            y: 200
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1,
                                staggerChildren: 2,
                                delayChildren: 1
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        {res[0].newProduct ? (<h4 className='new-tag' style={{ color: "#D87D4A", textAlign: "start" }}>new product</h4>) : ""}


                        <h1 className='title category-product-title'>{res[0].name}</h1>
                        <p className='pgh category-product-pgh-header'>
                            {res[0].description}
                        </p>

                        <h3 style={{ textAlign: "start" }}>$ {res[0].price}</h3>

                        <div className=' add-to-cart-div'>
                            <div className=' add-to-cart-divs add-to-cart-span' >
                                <button className='arthBtn' disabled={(disable()[0]?.quantity <= 1) ? true : false} onClick={() => dispatch({ type: "sub", id: res[0].id })}>−</button>
                                <span>{data?.map(map => ((map.id === res[0].id) ? map.quantity : ""))}</span>
                                <button className='arthBtn' onClick={() => dispatch({ type: "add", id: res[0].id })}>+</button>
                            </div>

                            <motion.button className='product-btn header-btn add-to-cart-divs'
                                initial={{
                                    y: 0,
                                }}
                                animate={{
                                    y: 7,
                                }}

                                transition={{
                                    type: 'tween',
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    duration: 1,
                                }}
                                onClick={() => dispatch({ type: "addToCart", id: res[0].id, price: res[0].price, name: res[0].name, slug: res[0].slug })} disabled={(disable()[0]?.quantity > 1)} >
                                add to cart
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                <div className='features-include-div'>

                    <motion.div className='features-div'
                        initial={{
                            opacity: 0,
                            x: 2 % 2 === 0 ? 50 : -50
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 1,
                                staggerChildren: 2,
                                delayChildren: 1
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ textAlign: "start" }} className='sub-title'>features</h2>

                        <p className='pgh category-product-pgh features-pgh'>
                            {res[0].features}
                        </p>
                    </motion.div>


                    <motion.div className="product-info-div-box"
                        initial={{
                            opacity: 0,
                            x: 1 % 2 === 0 ? 50 : -50
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

                        <h2 style={{ textAlign: "start" }} className='sub-title sub-title-product'>
                            in the box
                        </h2>

                        <div className='inthebox' >

                            {res[0].includes.map((map, index) => (


                                <h4 key={index} className='qty'> <span className='qty-span'>x{map.quantity}</span>{map.item}</h4>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>

            <div className='galleryImg'>
                <motion.img
                    className='galleryImg-1'
                    initial={{
                        opacity: 0,
                        y: -200
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}

                    src={res[0].gallery.first.desktop} alt="" />
                <motion.img className='galleryImg-1'
                    initial={{
                        opacity: 0,
                        y: 200
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}

                    src={res[0].gallery.second.desktop} alt="" />
                <motion.img className='galleryImg-2'
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
                    src={res[0].gallery.third.desktop} alt="" />
            </div>

            <div className='other-product-div'>

                <h2 className='sub-title'>
                    you may also like
                </h2>


                <motion.div className='other-product-container'
                    initial={{
                        opacity: 0,
                        x: 1 % 2 === 0 ? 50 : -50
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


                    {res[0].others.map((map, index) => (
                        <div key={index} className='other-product-inner-div'>
                            <div className='d-flex other-product-img-bg'>
                                <Image
                                    src={map.image.desktop}
                                    alt={map.image.desktop}
                                    width={100}
                                    height={100}
                                    className='other-product-img'
                                />
                            </div>

                            <h2 className='sub-title'>{map.name}</h2>


                            <Link href={`/products/${map.slug}`} >
                                <motion.button style={{ alignSelf: "center" }} className='product-btn header-btn'
                                    initial={{
                                        y: 0,
                                    }}
                                    animate={{
                                        y: 7,
                                    }}

                                    transition={{
                                        type: 'tween',
                                        ease: 'easeInOut',
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        duration: 1,
                                    }}
                                >
                                    see product
                                </motion.button>
                            </Link>
                        </div>
                    ))}
                </motion.div>


            </div >
        </div >

    )
}