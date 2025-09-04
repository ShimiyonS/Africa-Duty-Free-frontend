import { useEffect, useState } from 'react'
import BreadCrumb from '../components/commonComponents/BreadCrumb'
import CategoryBanner from '../components/commonComponents/CategoryBanner'
import BrandSwiper from '../components/commonComponents/BrandSwiper'
import NewProducts from '../components/commonComponents/NewProducts'
// import Products from '../components/commonComponents/Products'
import Common from '../commonMethod/Common'
import SaleCard from '../components/commonComponents/SaleCard'
// import BestBuy from '../components/commonComponents/BestBuy'
import { useParams } from 'react-router-dom'
import { banner } from '../Files/data'
import { MdClose } from 'react-icons/md'
import CategoryBuy from '../components/commonComponents/CategoryBuy'
const CategoryDetails = () => {
    const { slug, subslug } = useParams();
    const { apiRequest } = Common()
    const [filterOpen, setFilterOpen] = useState(false)
    const [products, setProducts] = useState([])
    const bannerDetails = banner?.find((item) => item?.name === slug);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", "/products");
            setProducts(data?.products)

        }
        fetchProducts()
    }, [])

    const handleOpenFilter = () => {
        if (window.innerWidth <= 768) {
            setFilterOpen(!filterOpen)
        }
    }
    return (
        <div className=''>
            {!subslug ?
                <>
                    <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: `${slug}`, nav: "" }]} />
                    <CategoryBanner bannerDetails={bannerDetails} />
                    <BrandSwiper />
                    {/* <BestBuy /> */}
                    <CategoryBuy />
                    {/* <Products data={products} paraClassName={"ps-4 linear-bg-heading text-color-secondary"} gridplacement={"product-grid"} imageheight={300} hidePopTool={true} /> */}
                    <SaleCard data={0} imageClass={"small-image"} />
                    <NewProducts heading={"New Product"} productsdata={products} hidePopTool={true} />
                    <SaleCard data={1} headingClass={"text-center mt-2"} imageClass={"big-image"} />
                </> :
                <>
                    <BreadCrumb navigation={[{ key: "home", nav: "/" },{key: `${slug}`, nav: `/product-category/${slug}` }, { key: `${subslug}`, nav: "" }]} />
                    <CategoryBanner bannerDetails={bannerDetails} />
                    <div className='container'>
                        <div className='d-flex mt-3 mb-5 align-items-center gap-3'>
                            <button type='button' className='sub-category-button text-color-secondary button-bg-danger  border-0'>{subslug} for her</button>
                            <button type='button' className='sub-category-button text-color-secondary  button-bg-success border-0'>{subslug} for him</button>
                        </div>
                        <div>
                            <p className='filter-wrapper-heading  dmsans-regular  text-color-danger' onClick={() => handleOpenFilter()}>show filters</p>

                            <div className='d-flex flex-wrap position-relative filter-wrapper'>
                                <div className={`col-12 col-sm-3 col-md-3 filter-left ${filterOpen ? "active" : "inactive"}`}>
                                    <button onClick={() => handleOpenFilter()} className='border-0 d-md-none bg-transparent ms-auto d-block'><MdClose /></button>
                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Skin Type</p>
                                    <ul className='list-unstyled'>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Dry Skin</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Oily Skin</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Combination Skin</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Sensitive Skin</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Mature Skin</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Normal Skin</li>
                                    </ul>
                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Product Category</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Cleansers</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Serums</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Moisturizers</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Eye Creams</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Masks</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Sun Protection (SPF)</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Night Care</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Skin Concerns</li>
                                    </ul>
                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Hydration</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Anti-Aging</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Even Skin Tone</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Acne / Blemishes</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Glow & Radiance</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Redness Reduction</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Pore Minimizing</li>
                                    </ul>
                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Price</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Under €25</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>€25 – €50</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>€50 – €100</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>€100 and up</li>
                                    </ul>

                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Brands</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>(Dropdown brands)</li>
                                    </ul>

                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>New & Popular</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>New Arrivals</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Bestsellers</li>
                                    </ul>

                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Customer Favorites</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Dermatologist Recommended</li>
                                    </ul>

                                    <p className='filter-heading justuspro-bold mb-2 text-color-primary'>Discount</p>
                                    <ul className="list-unstyled">
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Up to 10%</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>10% – 20%</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>20% – 30%</li>
                                        <li className='list-item pb-1 ps-2 justuspro-medium mb-0 text-color-primary'>Over 30%</li>
                                    </ul>
                                </div>
                                <div className='col-12 col-sm-9 col-md-9 '>
                                    <div className='d-flex flex-wrap'>
                                        {products.map((item) => {
                                            return (
                                                <div className='col-12 col-sm-6 col-md-6 col-lg-3'>
                                                    <img src={item?.thumbnail} className='filter-image' />
                                                    <p className='filter-title text-color-primary mb-1 justuspro-medium'>{item?.title}</p>
                                                    <p className='filter-title text-color-danger mb-0 justuspro-medium'>${item?.price}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <button type='button' className='sub-category-button text-color-secondary button-bg-danger  border-0 mx-auto my-5  d-block '>Show more items</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default CategoryDetails