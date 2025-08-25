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
import { apiRequest } from "../commonMethod/common"
import DiscountComponent from "../components/commonComponents/DiscountComponent"
import BestBuy from "../components/commonComponents/BestBuy"
import Banner from "../components/commonComponents/Banner"

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiRequest("GET", "/products", { page: 1 });
      setProducts(data?.products)
    };
    fetchProducts();
  }, [])

  const bestBuy = [
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
  return (
    <div className="container">
      <Banner />
      <BrandSwiper />
      <BestBuy data={bestBuy} itemClassName={`p-3 col-12 col-md-6 col-lg-3`}/>
      <NewProducts heading={"Most Popular"} productsdata={products} parentClassName={"mt-5"} />
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