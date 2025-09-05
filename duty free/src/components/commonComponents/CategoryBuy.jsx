import { Link, useParams } from "react-router-dom"
import categoryimage1 from "../../assets/categoryimage1.jpg"
import categoryimage2 from "../../assets/categoryimage2.jpg"
import categoryimage3 from "../../assets/categoryimage3.jpg"
import categoryimage4 from "../../assets/gifts.png"
import categoryimage5 from "../../assets/mens-accessories.png"
import Bagadi from "../../assets/Bacardi.png"
import Wisky from "../../assets/Bacardi.png"
import Brandy from "../../assets/blinkbottle.png"
import brand from "../../assets/blinkbottlelarge.png"
const bestBuyDefault = [
    {
        category: 'beauty',
        subcategory: "Fragrance",
        link: "Fragrance",
        image: categoryimage1,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 1
    },
    {
        category: 'beauty',
        subcategory: "Skincare",
        link: "fragrances",
        image: categoryimage2,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 2
    },
    {
        category: 'beauty',
        subcategory: "Cosmetics",
        link: "cosmetics",
        image: categoryimage3,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 3
    },
    {
        category: 'beauty',
        subcategory: "Gift Sets",
        link: "cosmetics",
        image: categoryimage4,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 4
    },
    {
        category: 'beauty',
        subcategory: "Mens grooming",
        link: "cosmetics",
        image: categoryimage5,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 5
    },
    {
        category: 'spirits',
        subcategory: "Brandy",
        link: "liqueur",
        image: brand,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 1
    },
    {
        category: 'spirits',
        subcategory: "Wisky",
        link: "fragrances",
        image: Wisky,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 2
    },
    {
        category: 'spirits',
        subcategory: "Whine",
        link: "cosmetics",
        image: categoryimage3,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 3
    },
    {
        category: 'spirits',
        subcategory: "Bacardi",
        link: "cosmetics",
        image: Brandy,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 4
    },
    {
        category: 'spirits',
        subcategory: "Bacardi",
        link: "cosmetics",
        image: Bagadi,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 5
    },
    {
        category: 'accessories',
        subcategory: "Bags",
        link: "liqueur",
        image: categoryimage1,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 1
    },
    {
        category: 'accessories',
        subcategory: "Glasses",
        link: "fragrances",
        image: Wisky,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 2
    },
    {
        category: 'accessories',
        subcategory: "Watch",
        link: "cosmetics",
        image: categoryimage3,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 3
    },
    {
        category: 'accessories',
        subcategory: "Shoes",
        link: "cosmetics",
        image: Brandy,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 4
    },
    {
        category: 'accessories',
        subcategory: "Jewels",
        link: "cosmetics",
        image: Bagadi,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 5
    },
    {
        category: 'travelers',
        subcategory: "Brandy",
        link: "liqueur",
        image: categoryimage1,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 1
    },
    {
        category: 'travelers',
        subcategory: "Wisky",
        link: "fragrances",
        image: Wisky,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 2
    },
    {
        category: 'travelers',
        subcategory: "Whine",
        link: "cosmetics",
        image: categoryimage3,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 3
    },
    {
        category: 'travelers',
        subcategory: "Bacardi",
        link: "cosmetics",
        image: Brandy,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 4
    },
    {
        category: 'travelers',
        subcategory: "Bacardi",
        link: "cosmetics",
        image: Bagadi,
        productname: "Dolce Gabana",
        productprice: 33,
        productid: 5
    }
]
const CategoryBuy = ({ data = bestBuyDefault, itemClassName }) => {
    const { slug, subslug } = useParams();
    return (
        <div className='d-flex align-items-center justify-content-evenly flex-wrap container'>
            {data?.filter(item => item.category === slug).map((item) => {
                return (
                    <div className={`${itemClassName ? itemClassName : "p-2 col-6 col-md-4 col-lg-2"}`}>
                        <div className=''>
                            <Link to={`/product-category/${slug}/${item.subcategory}`} className='d-block bg-color-danger justuspro-regular py-2 text-color-secondary text-center text-decoration-none mb-1 category-sub-title'>{item.subcategory}</Link>
                            <Link to={`/product/${item.productid}`}><img src={item.image} className='w-100 category-sub-img' /></Link>
                        </div>
                        <div>
                            <Link to={`/product/${item.productid}`} className="mt-2 mb-0 dmsans-medium category-sub-textsize text-decoration-none d-block text-color-primary"> {item.productname} </Link>
                            <p className="dmsans-bold text-color-danger category-sub-textsize">$ {item.productprice}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryBuy