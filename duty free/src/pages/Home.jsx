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

const Home = () => {
  const { apiRequest } = Common()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiRequest("GET", "/products");
      setProducts(data?.products)
    };
    fetchProducts();
  }, [])

  const bestBuy = [
    {
      name: "Liquor",
      link: "liquor",
      image: categoryimage1,
      desc: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
      name: "fragrances",
      link: "fragrances",
      image: categoryimage2,
      desc: "Discover Scents That Elevate Your Journey."
    },
    {
      name: "cosmetics",
      link: "cosmetics",
      image: categoryimage3,
      desc: "Indulge in your favorite spirits with exclusive duty-free."
    },
    {
      name: "accesoires",
      link: "accesoires",
      image: categoryimage4,
      desc: "Indulge in your favorite spirits with exclusive duty-free."
    }
  ]
  return (
    <div className="container">
      <Banner />
      <BrandSwiper />
      <BestBuy data={bestBuy} itemClassName={`p-4 col-12 col-md-6 col-lg-3`} />
      <NewProducts heading={"Most Popular"} productsdata={products} parentClassName={"mt-5"} hidePopTool={true} />
      <div className="container py-4 row justify-content-center gap-5">
        <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
          <div className="col-6 offerbanner bg-color-gold">
            <p className="text-color-secondary justuspro-regular">This week only fragrances</p>
            <p className="mb-0 text-color-secondary justuspro-regular">Dolce Gabana</p>
            <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$33</span> $28</p>
          </div>
          <div className="col-6">
            <img width={"100%"} height={"172"} src={OfferProduct1} alt="offerbanner"/>
          </div>
        </div>
        <div className="d-flex p-0 col-12 col-xl-4 col-lg-5 col-md-6 col-sm-12 offers">
          <div className="col-6 offerbanner bg-color-danger">
            <p className="text-color-secondary justuspro-regular">This week only beverage</p>
            <p className="mb-0 text-color-secondary justuspro-regular">Pommery</p>
            <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$33</span> $28</p>
          </div>
          <div className="col-6">
            <img width={"100%"} height={"172"} src={OfferProduct2} alt="offerbanner" />
          </div>
        </div>
      </div>
      <NewProducts heading={"Great value offers"} productsdata={products} hidePopTool={true} />

    </div>
  )
}

export default Home