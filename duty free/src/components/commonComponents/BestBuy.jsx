import categoryimage1 from "../../assets/categoryimage1.jpg"
import categoryimage2 from "../../assets/categoryimage2.jpg"
import categoryimage3 from "../../assets/categoryimage3.jpg"
import categoryimage4 from "../../assets/categoryimage4.jpg"
import CategoryCard from './CategoryCard'
const bestBuyDefault = [
    {
        name: "Fragrance",
        link: "liqueur",
        image: categoryimage1
    },
    {
        name: "Skincare",
        link: "fragrances",
        image: categoryimage2
    },
    {
        name: "Gift Sets",
        link: "cosmetics",
        image: categoryimage3
    },
    {
        name: "Accesoires",
        link: "cosmetics",
        image: categoryimage4
    }
]
const BestBuy = ({ data = bestBuyDefault, itemClassName }) => {
    return (
        <div className='d-flex align-items-center flex-wrap container'>
            {data?.map((item) => {
                return (
                    <div className={`${itemClassName ? itemClassName : "p-5 col-12 col-md-6 col-lg-3"}`}>
                        <CategoryCard image={item.image} text={item?.name} link={item?.link} />
                    </div>
                )
            })}
        </div>
    )
}

export default BestBuy