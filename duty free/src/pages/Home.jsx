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
import Common from "../commonMethod/Common"
import BestBuy from "../components/commonComponents/BestBuy"
import Banner from "../components/commonComponents/Banner"
import TitleComponent from "../components/TitleComponent"
import { useLocation } from "react-router-dom"
import DiscountComponent from "../components/commonComponents/DiscountComponent"
import SwiperComponent from "../components/commonComponents/swiperComponent"

const Home = () => {
  const { apiRequest } = Common()
  const [products, setProducts] = useState([])

  const location = useLocation()
  const slug = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiRequest("GET", "/products");
      setProducts(data?.products)
    };
    fetchProducts();
  }, [])

  const bestBuy = [
    {
      name: "Fragrance",
      slug: "fragrances",
      image: categoryimage1,
      des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
      name: "Skincare",
      slug: "skincare",
      image: categoryimage2,
      des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
      name: "Gift Sets",
      slug: "gift-sets",
      image: categoryimage3,
      des: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
      name: "Accesoires",
      slug: "accessories",
      image: categoryimage4,
      des: "Indulge in your favorite spirits with exclusive duty-free."
    }
  ]

  return (
    <div className="container">
      <Banner />
      <BrandSwiper />
      <TitleComponent heading={"Most Popular"} />
      <div className="pagebody">
        <NewProducts heading={"Most Popular"} productsdata={products} parentClassName={"mt-2"} hidePopTool={true} />
        <div className="container py-4 row justify-content-center gap-5">
          <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
            <div className="col-6 offerbanner bg-color-gold">
              <p className="text-color-secondary justuspro-regular">This week only beverage.</p>
              <p className="mb-0 text-color-secondary justuspro-regular">Pommery</p>
              <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$30</span> $20</p>
            </div>
            <div className="col-6">
              <img width={"100%"} height={"172"} src={OfferProduct1}></img>
            </div>
          </div>
          <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
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
        <div>
          <div className="px-3 fw-bold ">Products</div>
          <BestBuy data={bestBuy} itemClassName={`p-3 col-12 col-md-6 col-lg-3`} />
        </div>
        <DiscountComponent />
        {slug === "" && <SwiperComponent />}
      </div>

      {/* <NewProducts heading={"Great value offers"} productsdata={products} hidePopTool={true} /> */}
    </div>
  )
}

export default Home