'use client'
import React from 'react'
import Category from '@/components/category'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/loading'

// import React, { useState, useEffect } from 'react';

function Categories() {
    const [isLoading, setIsLoading] = React.useState(true);

    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("/api/categories", {
                    method: "GET",
                    // headers: {
                    //     "Content-Type": "text/x-component",
                    // }
                });
                const data = await res.json();
                setIsLoading(false);
                setCategories(data.categories);
                // console.log(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }

        fetchCategories();
    }, []);

    if (isLoading) return (<Loading />)




    return (
        <div className='categories'>
            {/* <Link className='link' href={'/upload'}>
                <div className='sellDiv d-flex'>
                    <Image
                        src="/assets/sell.svg"
                        width="16"
                        height="16"
                        alt="loading"

                    />
                    Sell
                </div>
            </Link> */}

            {
                categories.map((category) => (
                    <Link className='link' href={`/categories/${category.title}`} key={category.id}>
                        <Category title={category.title} image={category.image} />
                    </Link>
                ))
            }
        </div>
    )
}

export default Categories