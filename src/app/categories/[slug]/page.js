"use client"
import React from 'react'
import Radio from "@/components/radio";
import UseType from "@/components/useType";
import BrandCategories from "@/conatiners/brandCategories";
import CategoryItems from "@/conatiners/categoryItems";
import ProductsContainer from "@/conatiners/productsContainer";
import SearchAndFIlter from "@/conatiners/searchAndFIlter";
import TopSuggested from "@/conatiners/topSuggested";
import Back from '@/components/back';

import { AuthContext } from "../../../../context/authContext";
import Loading from '@/loading'
import axios from 'axios'

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}


export default function CatergoryPage({ params }) {
    // console.log(params.slug);


    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser);
    const [productData, setProductData] = React.useState([])
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


    React.useEffect(() => {
        // if (isUser && isUser.id) {
        setRequestStatus(REQUEST_STATUS.LOADING)
        async function fetchData() {
            try {
                const result = await axios.get(`/api/categories/category?title=${params.slug}`);
                setProductData(result.data.category.products);
                setRequestStatus(REQUEST_STATUS.SUCCESS)
                // console.log(result.data);
            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE)
                console.error('Error fetching product data:', error);
            }
        }
        fetchData();
        // }
    }, [isUser, params.slug])
    // console.log(productData);


    if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)

    return (
        <>
            <section className=''>

                <div>

                    <div className='subHeaderDiv d-flex padding'>
                        <Back />

                        <h3 className='subtitle2' > {decodeURIComponent(params.slug)
                            .replace(/%20/g, ' ')
                            .replace(/\b\w/g, (char) => char.toUpperCase())
                        }</h3>
                    </div>

                    <div className="categoriesInnerDiv d-flex">

                        <SearchAndFIlter />
                        <CategoryItems />
                    </div>

                    <div className="priceCategoryDiv d-flex">
                        <h3 className="suggestionHeader">Select Price Category</h3>
                        <Radio />
                    </div>

                    <UseType />

                    <BrandCategories />

                    <TopSuggested />
                    <ProductsContainer data={productData} />
                </div>

            </section>
        </>
    )
}
