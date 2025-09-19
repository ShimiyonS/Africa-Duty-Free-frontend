
import categoryimage1 from "../../assets/categoryimage1.jpg"
import categoryimage2 from "../../assets/categoryimage2.jpg"
import categoryimage3 from "../../assets/categoryimage3.jpg"
import categoryimage4 from "../../assets/categoryimage4.jpg"
import CategoryCard from './CategoryCard.jsx'
import CategoryLoader from "./loader/CategoryLoader.jsx"
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
const BestBuy = ({ data = bestBuyDefault, itemClassName, loading }) => {
    // const { slug, subslug } = useParams();
    return (
        <div className='d-flex align-items-center flex-wrap mb-5'>
            {loading ? Array.from({ length: 4 }).map((item) => <div className={`${itemClassName ? itemClassName : "p-5 col-12 col-md-6 col-lg-3"}`}> <CategoryLoader /></div>)
                : data?.map((item, idx) => {
                    return (
                        <div className={`${itemClassName ? itemClassName : "p-3 p-md-5 p-lg-5 col-12 col-md-6 col-lg-3"}`} key={idx}>
                            <CategoryCard item={item} image={item?.image_url || item?.image} text={item?.name || item?.subcategoryName} link={`${item?.category?.slug}/${item?.slug}`} />
                        </div>
                    )
                })}
        </div>
    )
}

export default BestBuy