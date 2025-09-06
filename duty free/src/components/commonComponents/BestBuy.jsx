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
        slug: "fragrances",
        image: categoryimage1,
        des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Skincare",
        link: "fragrances",
        slug: "skincare",
        image: categoryimage2,
        des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Gift Sets",
        link: "cosmetics",
        slug: "gift-sets",
        image: categoryimage3,
        des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
        name: "Accesoires",
        link: "cosmetics",
        slug: "accessories",
        image: categoryimage4,
        des: "Indulge in your favorite spirits with exclusive duty-free."
    }
]
const BestBuy = ({ data = bestBuyDefault, itemClassName, slug }) => {
    // const { slug, subslug } = useParams();
    return (
        <div className='d-flex align-items-center flex-wrap container'>
            {data?.map((item, idx) => {
                return (
                    <div className={`${itemClassName ? itemClassName : "p-5 col-12 col-md-6 col-lg-3"}`} key={idx}>
                        <CategoryCard item={item} image={item.image} text={item?.name} link={slug ? slug + "/" + item?.slug : item?.slug} />
                    </div>
                )
            })}
        </div>
    )
}

export default BestBuy