import React from "react";
// import styles from "./page.module.css";
import Header from "@/components/header";
import HomepageSearch from "@/components/homepageSearch";
import HomepageBanner from "@/components/homepageBanner";
import Category from "@/components/category";
import Categories from "@/conatiners/categories";
import TopSuggested from "@/conatiners/topSuggested";
import ProductsContainer from "@/conatiners/productsContainer";
import Alert from "@/components/alert";

import AdReshuffle from "@/components/adReshuffle";
import Link from "next/link";



export default function Home() {

  // const { isUser, isLoading } = React.useContext(AuthContext)
  // console.log(isUser);
  // const [productData, setProductData] = React.useState([])
  // const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.LOADING)


  // React.useEffect(() => {
  //   if (isUser && isUser.id) {
  //     setRequestStatus(REQUEST_STATUS.LOADING)

  //     async function fetchData() {
  //       try {
  //         const result = await axios.get(`/api/paidAd?userId=${isUser.id}`);
  //         setProductData(result.data.data);
  //         setRequestStatus(REQUEST_STATUS.SUCCESS)

  //       } catch (error) {
  //         setRequestStatus(REQUEST_STATUS.FAILURE)
  //         console.error('Error fetching product data:', error);
  //       }
  //     }
  //     fetchData();
  //   } else {
  //     setRequestStatus(REQUEST_STATUS.FAILURE)
  //   }
  // }, [isUser])
  // console.log(productData);

  return (
    <div className="container">
      <main className=''>
        <Link className="links" href="/search">
          <HomepageSearch />
        </Link>
        <HomepageBanner />
        <Categories />
        <TopSuggested />

        <h3 className="suggestionHeader otherItems">Other Items</h3>
        {/* <ProductsContainer data={productData} /> */}
        <AdReshuffle />
        {/* <Alert text="Product uploaded sucessfully" /> */}

      </main>
    </div>
  );
}

//first sort the array by the lastest created date or updated date
//then filter the array by the subscription type

//then The normal package works with a 6 hour time interval, 
//giving 4 chances in 24 hours

//The pro package works with a 4 hours reshuffle interval, 
// giving 6 chances in 24 hours

//And the plus package works with 2 hours reshuffle interval, 
// giving 12 chances in 24 hours