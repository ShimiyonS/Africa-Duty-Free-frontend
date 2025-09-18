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
        setProducts(data?.products)
        const uniqueSubCategories = [
          ...new Map(
            (data?.products || [])
              .map(item => [item?.subCategory?.slug, item?.subCategory]) // use slug as key
          ).values()
        ];
        setCategory(uniqueSubCategories)
        console.log()

      } catch (error) {
        console.log(error.message)
      }
    };
    fetchProducts();
  }, [])

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     setCategoryLoading(true)
  //     try {
  //       const data = await apiRequest("GET", "/categories", {}, { "X-API-Key": import.meta.env.VITE_APP_YESERP_API_KEY }, import.meta.env.VITE_APP_YESERP_URL);
  //       setCategory(data?.data?.filter(item => item?.x_parent_id === null))
  //       console.log(data?.data)

  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //     finally {
  //       setCategoryLoading(false)
  //     }
  //   };
  //   fetchCategory();
  // }, [])

  return (
    <div className="container">
      <Banner />
      <BrandSwiper />
      <div>
        <BestBuy data={category} itemClassName={`p-3 col-12 col-md-6 col-lg-3`}  loading={categoryLoading} />
      </div>
      <div className="pagebody">
        <TitleComponent heading={"Most Popular"} />
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

        <DiscountComponent />
        {slug === "" && <SwiperComponent />}
      </div>

      {/* <NewProducts heading={"Great value offers"} productsdata={products} hidePopTool={true} /> */}
    </div>
  )
}

export default Home