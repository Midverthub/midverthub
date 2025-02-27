
import Radio from "@/components/radio";
import UseType from "@/components/useType";
import BrandCategories from "@/conatiners/brandCategories";
import CategoryItems from "@/conatiners/categoryItems";
import ProductsContainer from "@/conatiners/productsContainer";
import SearchAndFIlter from "@/conatiners/searchAndFIlter";
import TopSuggested from "@/conatiners/topSuggested";
import "./style.css"


export default function CatergoriesPage({ children }) {
    return (
        <>
            <section className='margin-b'>

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
                    <TopSuggested />
                    <ProductsContainer />
                </div>

            </section>
        </>
    )
}
