import React from "react";
import Image from "next/image";
// import styles from "./page.module.css";
import Header from "@/components/header";
import HomepageSearch from "@/components/homepageSearch";
import HomepageBanner from "@/components/homepageBanner";
import Category from "@/components/category";
import Categories from "@/conatiners/categories";
import TopSuggested from "@/conatiners/topSuggested";

export default function Home() {
  return (
    <div className="container">
      <main className=''>
        <header>
          <Header />
        </header>
        <HomepageSearch />
        <HomepageBanner />
        <Categories />
        <TopSuggested />



      </main>
    </div>
  );
}
