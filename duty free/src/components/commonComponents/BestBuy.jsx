import categoryimage1 from "../../assets/categoryimage1.jpg"
import categoryimage2 from "../../assets/categoryimage2.jpg"
import categoryimage3 from "../../assets/categoryimage3.jpg"
import categoryimage4 from "../../assets/categoryimage4.jpg"
import CategoryCard from './CategoryCard'
const BestBuy = () => {
    return (
        <div className='d-flex align-items-center flex-wrap container'>
            <div className='p-5 col-12 col-md-6 col-lg-3'>
                <CategoryCard image={categoryimage1} text={"Fragrance"} link={"liqueur"} />
            </div>
            <div className='p-5 col-12 col-md-6 col-lg-3'>
                <CategoryCard image={categoryimage2} text={"Skincare"} link={"fragrances"} />
            </div>
            <div className='p-5 col-12 col-md-6 col-lg-3'>
                <CategoryCard image={categoryimage3} text={"Gift Sets"} link={"cosmetics"} />
            </div>
            <div className='p-5 col-12 col-md-6 col-lg-3'>
                <CategoryCard image={categoryimage4} text={"Accesoires"} link={"cosmetics"} />
            </div>
        </div>
    )
}

export default BestBuy