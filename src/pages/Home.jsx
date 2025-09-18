import "../Styles/home.css"
import BrandSwiper from "../components/commonComponents/BrandSwiper"
import CategoryCard from "../components/commonComponents/CategoryCard"
import categoryimage1 from "../assets/liquor.jpeg"
import categoryimage2 from "../assets/fragnance.jpg"
import categoryimage3 from "../assets/lipstisk.jpg"
import categoryimage4 from "../assets/categoryimage4.jpg"
import OfferProduct1 from "../assets/categoryimage1.jpg"
import OfferProduct2 from "../assets/categoryimage5.jpg"
import NewProducts from "../components/commonComponents/NewProducts"
import { useEffect, useState } from "react"
import Common from "../commonMethod/common"
import BestBuy from "../components/commonComponents/BestBuy"
import Banner from "../components/commonComponents/Banner"
import TitleComponent from "../components/TitleComponent"
import { useLocation } from "react-router-dom"
import DiscountComponent from "../components/commonComponents/DiscountComponent"
import SwiperComponent from "../components/commonComponents/swiperComponent"

const Home = () => {
  const { apiRequest } = Common()
  const [products, setProducts] = useState([])

  const [category, setCategory] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)

  const location = useLocation()
  const slug = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("GET", "/product", { limit: 100 });
        const category = await apiRequest("GET", "/subcategory");
        setProducts(data?.products)
        setCategory(Array.from(new Map(category?.subCategories.map(item => [item?.slug, item])).values()))
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchProducts();
  }, [])

  return (
    <div className="container">
      <Banner />
      <BrandSwiper />
      <BestBuy data={category} itemClassName={`p-md-3 col-12 col-md-6 col-lg-3`} loading={categoryLoading} />
      <div className="pagebody">
        <TitleComponent heading={"Most Popular"} />
        <NewProducts heading={"Most Popular"} productsdata={products} parentClassName={"mt-2"} hidePopTool={true} />
        <div className="py-0 pb-4 py-md-4 d-flex flex-wrap justify-content-center">
          <div className="d-flex flex-wrap col-12 col-xl-4 col-lg-6 col-md-12 col-sm-12 offers mb-3 mb-lg-0">
            <div className="col-6 col-md-6 offerbanner bg-color-gold">
              <p className="text-color-secondary justuspro-regular">This week only beverage.</p>
              <p className="mb-0 text-color-secondary justuspro-regular">Pommery</p>
              <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$30</span> $20</p>
            </div>
            <div className="col-6 col-md-6">
              <img width={"100%"} height={"172"} src={OfferProduct1}></img>
            </div>
          </div>
          <div className="d-flex flex-wrap col-12 col-xl-4 col-lg-6 col-md-12 col-sm-12 offers">
            <div className="col-6 offerbanner bg-color-danger">
              <p className="text-color-secondary justuspro-regular">This week only beverage.</p>
              <p className="mb-0 text-color-secondary justuspro-regular">Pommery</p>
              <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$30</span> $20</p>
            </div>
            <div className="col-6">
              <img width={"100%"} height={"172"} src={OfferProduct2} alt="" />
            </div>
          </div>
        </div>

        <DiscountComponent />
        {slug === "" && <SwiperComponent />}
      </div>

      {/* <NewProducts heading={"Great value offers"} productsdata={products} hidePopTool={true} /> */}
    </div>
  )
}

export default Home