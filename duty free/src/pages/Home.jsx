import "../Styles/home.css"
import HomeBanner2 from "../assets/home-banner-2.png"
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
import { apiRequest } from "../commonMethod/common"
import DiscountComponent from "../components/commonComponents/DiscountComponent"
import BestBuy from "../components/commonComponents/BestBuy"

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiRequest("GET", "/products", { page: 1 });
      setProducts(data?.products)
    };
    fetchProducts();
  }, [])
  return (
    <div className="container">

      <div className="section-1">
        <div className="home-banner text-white">
          <div className="col-6">
            <h3>duty free</h3>
            <h3>30%</h3>
            <h3>less on high street prices</h3>
            <img src={HomeBanner2} width={200} height={200} alt="homebanner" />
          </div>
          <div className="d-none d-md-block col-6">
            <h3>the good life</h3>
            <h3>the best brands</h3>
            <h3>real value duty free</h3>
            <button className="rounded-pill border-0 shop-btn">Shop Now</button>
          </div>
        </div>
        <div className="wigited-buttons d-flex gap-3 justify-content-center">
          <div className="wigited-box">Exclusive for Diplomats</div>
          <div className="wigited-box">For Duty-free Operators</div>
        </div>
      </div>

      <BrandSwiper />
      {/* <BestBuy /> */}

      <div className='d-flex align-items-center flex-wrap'>
        <div className='p-3 col-12 col-md-6 col-lg-3'>
          <CategoryCard image={categoryimage1} text={"Fragrance"} link={"liqueur"} />
        </div>
        <div className='p-3 col-12 col-md-6 col-lg-3'>
          <CategoryCard image={categoryimage2} text={"Skincare"} link={"fragrances"} />
        </div>
        <div className='p-3 col-12 col-md-6 col-lg-3'>
          <CategoryCard image={categoryimage3} text={"Gift Sets"} link={"cosmetics"} />
        </div>
        <div className='p-3 col-12 col-md-6 col-lg-3'>
          <CategoryCard image={categoryimage4} text={"Accesoires"} link={"cosmetics"} />
        </div>
      </div>

      <NewProducts heading={"Most Popular"} productsdata={products} />

      <div className="container py-4 row justify-content-center gap-5">
        <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
          <div className="col-6 offerbanner1">
            <p>This week only beverage.</p>
            <p className="mb-0">Pommery</p>
            <p><span className="text-decoration-line-through fs-6">$30</span> $20</p>
          </div>
          <div className="col-6">
            <img width={"100%"} height={"172"} src={OfferProduct1}></img>
          </div>
        </div>
        <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
          <div className="col-6 offerbanner2">
            <p>This week only beverage.</p>
            <p className="mb-0">Pommery</p>
            <p><span className="text-decoration-line-through fs-6">$30</span> $20</p>
          </div>
          <div className="col-6">
            <img width={"100%"} height={"172"} src={OfferProduct2} alt="" />
          </div>
        </div>
      </div>

      <NewProducts heading={"Great value offers"} productsdata={products} />

      <DiscountComponent />

    </div>
  )
}

export default Home