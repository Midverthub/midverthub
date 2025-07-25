'use client'
import React from 'react'
import { AuthContext } from '../../context/authContext'
import Loading from '@/loading'
import axios from 'axios'
import ProductsContainerReshuffle from '@/conatiners/productsContainerReshuffle'


export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
};


export default function AdReshuffle() {

    const { isUser, isLoading } = React.useContext(AuthContext)

    const [productData, setProductData] = React.useState([])

    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)



    async function fetchData() {
        try {
            setRequestStatus(REQUEST_STATUS.LOADING)

            const result = await axios.get(`/api/paidAd`);
            setProductData(result.data.data);
            setRequestStatus(REQUEST_STATUS.SUCCESS)

        } catch (error) {
            setRequestStatus(REQUEST_STATUS.FAILURE)
            console.error('Error fetching product data:', error);
        }
    }


    React.useEffect(() => {
        setRequestStatus(REQUEST_STATUS.LOADING)
        fetchData()


        // Refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);

        // Clean up on unmount
        return () => clearInterval(interval);
    }, [])

    if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)

    return (
        <ProductsContainerReshuffle data={productData} />
    )
}

// Developer notes about the reshuffling logic:
// if the time difference btw the current time and the updated time
// is greater than 2 mins, reshuffle the ad
//run the interval every 1 mins