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
}

export default function AdReshuffle() {

    const { isUser, isLoading } = React.useContext(AuthContext)
    // console.log(isUser);
    const [productData, setProductData] = React.useState([])
    const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)
    const [isRendered, setIsRendered] = React.useState(1)

    const intervalRef = React.useRef(null); // Track the interval




    React.useEffect(() => {


        // if (isUser && isUser.id) {
        setRequestStatus(REQUEST_STATUS.LOADING)

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
        fetchData()
        // } else {
        // setRequestStatus(REQUEST_STATUS.FAILURE)
        // }
    }, [])
    // console.log(productData);

    React.useEffect(() => {
        if (requestStatus !== REQUEST_STATUS.SUCCESS) return


        const twoMinsInMilliseconds = 2 * 60 * 1000;
        // console.log(currentTime);
        // console.log(`Time difference in hours: ${timeDifference}`);
        // if (timeDifference > 2 * 60 * 60 * 1000) {
        //     console.log('More than 2 hours have passed');
        // } else {
        //     console.log('Less than 2 hours have passed');
        // }

        // const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        // const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;
        // const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;


        // if (timeDifference < twoHoursInMilliseconds) {
        //     console.log("it's not time"); // Skip this interval if the time difference is less than 2 hours
        // } else {
        //     console.log("it's time");
        // }
        // console.log(updateTimestamp);
        // console.log(product.updatedAt);

        // Clear any existing interval before setting a new one
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }


        async function fetchData() {
            try {
                const result = await axios.get(`/api/paidAd`);
                setProductData(result.data.data);
                setRequestStatus(REQUEST_STATUS.SUCCESS)

            } catch (error) {
                setRequestStatus(REQUEST_STATUS.FAILURE)
                console.error('Error fetching product data:', error);
            }
        }


        intervalRef.current = setInterval(async () => {
            const currentTime = new Date().getTime();

            for (const product of productData) {
                // console.log(isRendered);

                const updateTimestamp = new Date(product.updatedAt).getTime();
                // console.log(updateTimestamp);

                // if (currentTime - updateTimestamp > twoMinsInMilliseconds) {
                //     return console.log(true);
                // } else {
                //     return console.log(false);
                // }
                const timeDifference = currentTime - updateTimestamp

                // console.log("Interval running");
                // Check the state and perform an action based on the state
                if (product.subscription === 'manual plan' && (timeDifference > twoMinsInMilliseconds)) {
                    // console.log("Normal package: 6 hours interval action");
                    if (false) {
                        // if (product.count >= 4) {
                        // try {
                        //     const res = await fetch(`/api/paidAd/slug`, {
                        //         method: 'DELETE',
                        //         headers: {
                        //             'Content-Type': 'application/json',
                        //         },
                        //         body: JSON.stringify({
                        //             // userId: isUser.id,
                        //             paidAdId: product.id
                        //         })
                        //     });

                        //     if (res.status === 200) {
                        //         console.log("Ad deleted successfully successfully");
                        //         // console.log(await res.json());
                        //         fetchData();
                        //         // if (isRendered) {
                        //         //     setIsRendered(prevState => prevState + 1)
                        //         // }
                        //     }
                        // } catch (error) {
                        //     console.error('Error reshuffling product:', error);
                        // }
                    } else {


                        try {
                            const res = await fetch(`/api/paidAd/slug`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    // userId: isUser.id,
                                    productId: product.productId,
                                    paidAdId: product.id,
                                    subscription: product.subscription,
                                    count: product.count
                                })
                            });

                            if (res.status === 200) {
                                console.log("Ad updated successfully successfully");
                                // console.log(await res.json());
                                fetchData();
                                // if (isRendered) {
                                //     setIsRendered(prevState => prevState + 1)
                                // }

                            }

                        } catch (error) {
                            console.error('Error reshuffling product:', error);
                        }
                    }

                    // Perform action for normal package
                } else if (product.subscription === 'pro package' && (timeDifference > twoMinsInMilliseconds)) {
                    // console.log("Pro package: 4 hours interval action");
                    if (false) {
                        // if (product.count >= 6) {
                        // console.log('Product count is greater than 6');
                        // try {
                        //     const res = await fetch(`/api/paidAd/slug`, {
                        //         method: 'DELETE',
                        //         headers: {
                        //             'Content-Type': 'application/json',
                        //         },
                        //         body: JSON.stringify({
                        //             // userId: isUser.id,
                        //             paidAdId: product.id
                        //         })
                        //     });

                        //     if (res.status === 200) {
                        //         console.log("Ad deleted successfully successfully");
                        //         // console.log(await res.json());
                        //         fetchData();
                        //         // if (isRendered) {
                        //         //     setIsRendered(prevState => prevState + 1)
                        //         // }
                        //         // console.log('is rendered');
                        //         // console.log(isRendered);

                        //     }
                        // } catch (error) {
                        //     console.error('Error reshuffling product:', error);
                        // }
                    } else {


                        try {
                            const res = await fetch(`/api/paidAd/slug`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    // userId: isUser.id,
                                    productId: product.productId,
                                    paidAdId: product.id,
                                    subscription: product.subscription,
                                    count: product.count

                                })
                            });

                            if (res.status === 200) {
                                console.log("Ad updated successfully successfully");
                                // console.log(await res.json());
                                fetchData();
                                // if (isRendered) {
                                //     setIsRendered(prevState => prevState + 1)
                                // }

                            }

                        } catch (error) {
                            console.error('Error reshuffling product:', error);
                        }
                    }

                    // Perform action for pro package
                } else if (product.subscription === 'pro plus package' && (timeDifference > twoMinsInMilliseconds)) {
                    // console.log("Plus package: 2 hours interval action");
                    if (false) {
                        // if (product.count >= 12) {
                        // try {
                        //     const res = await fetch(`/api/paidAd/slug`, {
                        //         method: 'DELETE',
                        //         headers: {
                        //             'Content-Type': 'application/json',
                        //         },
                        //         body: JSON.stringify({
                        //             // userId: isUser.id,
                        //             paidAdId: product.id
                        //         })
                        //     });

                        //     if (res.status === 200) {
                        //         console.log("Ad deleted successfully successfully");
                        //         // console.log(await res.json());
                        //         fetchData();
                        //         // if (isRendered) {
                        //         //     setIsRendered(prevState => prevState + 1)
                        //         // }

                        //     }
                        // } catch (error) {
                        //     console.error('Error reshuffling product:', error);
                        // }
                    } else {


                        try {
                            const res = await fetch(`/api/paidAd/slug`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    // userId: isUser.id,
                                    productId: product.productId,
                                    paidAdId: product.id,
                                    subscription: product.subscription,
                                    count: product.count

                                })
                            });

                            if (res.status === 200) {
                                console.log("Ad updated successfully successfully");
                                // console.log(await res.json());
                                fetchData();
                                // if (isRendered) {
                                //     setIsRendered(prevState => prevState + 1)
                                // }

                            }

                        } catch (error) {
                            console.error('Error reshuffling product:', error);
                        }
                    }
                    // Perform action for plus package
                }
            }; // 2 minutes interval

        }, 1000); // 1 minutes interval

        return () => {
            clearInterval(intervalRef.current);
        };

    }, [productData, requestStatus]);


    if (isLoading === "loading" || requestStatus === REQUEST_STATUS.LOADING) return (<Loading />)


    return (
        <ProductsContainerReshuffle data={productData} />
    )
}


// if the time difference btw the current time and the updated time
// is greater than 2 mins, reshuffle the ad
//run the interval every 1 mins