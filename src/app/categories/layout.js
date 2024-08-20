
import Radio from "@/components/radio";
import UseType from "@/components/useType";
import BrandCategories from "@/conatiners/brandCategories";
import CategoryItems from "@/conatiners/categoryItems";
import ProductsContainer from "@/conatiners/productsContainer";
import SearchAndFIlter from "@/conatiners/searchAndFIlter";
import TopSuggested from "@/conatiners/topSuggested";



export default function CatergoriesLayout({ children }) {
    return (
        <>
            <section className=''>

                <div>
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

                    {children}
                    <TopSuggested />
                    <ProductsContainer />
                </div>

            </section>
        </>
    )
}
