import { useParams } from "react-router-dom"
import categoryimage1 from "../../assets/categoryimage1.jpg"
import categoryimage2 from "../../assets/categoryimage2.jpg"
import categoryimage3 from "../../assets/categoryimage3.jpg"
import categoryimage4 from "../../assets/categoryimage4.jpg"
import CategoryCard from './CategoryCard'
const bestBuyDefault = [
    {
        name: "Fragrance",
        link: "liqueur",
        image: categoryimage1,
        desc: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Skincare",
        link: "fragrances",
        image: categoryimage2,
        desc: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Gift Sets",
        link: "cosmetics",
        image: categoryimage3,
        desc: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Accesoires",
        link: "cosmetics",
        image: categoryimage4,
        desc: "Indulge in your favorite spirits with exclusive duty-free."
    }
]
const BestBuy = ({ data = bestBuyDefault, itemClassName }) => {
    const { slug, subslug } = useParams();
    return (
        <div className='d-flex align-items-center flex-wrap container'>
            {data?.map((item) => {
                return (
                    <div className={`${itemClassName ? itemClassName : "p-5 col-12 col-md-6 col-lg-3"}`}>
                        <CategoryCard image={item.image} text={item?.name} link={slug ? slug + "/" + item?.link : item?.link} desc={item.desc} />
                    </div>
                )
            })}
        </div>
    )
}

export default BestBuy