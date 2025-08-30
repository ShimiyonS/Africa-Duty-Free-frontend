import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductCard from "../../components/commonComponents/ProductCard";
import { useEffect, useState } from "react";
import Common from "../../commonMethod/Common";
const MyaccountDashboard = () => {
  const { apiRequest } = Common()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await apiRequest("GET", "/products");
      setProducts(data?.products)
    };
    fetchProducts();
  }, [])
  return (
    <>
      <div className="d-block d-lg-flex justify-content-between gap-3">
        <div className="dashboard-option col-12 col-lg-6 d-flex justify-content-start align-items-center gap-2 my-4 my-lg-0">
          <div className="dashboard-icon-section bg-color-gold">
            <FaHome className="dashboard-icon text-color-secondary" />
          </div>
          <div className="">
            <Link to="/my-account/edit-address/billing" className="dashboard-link text-color-primary justuspro-medium ">Billing Address</Link>
            <p>Add or Edit billing address</p>
          </div>
        </div>
        <div className="dashboard-option col-12 col-lg-6 d-flex justify-content-start align-items-center gap-2">
          <div className="dashboard-icon-section bg-color-gold">
            <FaRegUser className="dashboard-icon text-color-secondary" />
          </div>
          <div className="">
            <Link to="/my-account/edit-account" className="dashboard-link text-color-primary justuspro-medium ">My Account</Link>
            <p>Edit your account details</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="my-4 justuspro-bold">New in stock</h2>
        <div className="d-flex flex-wrap">
          {products.map((item,index)=>{
            return(
              <div className="col-12 col-sm-6 col-lg-3 col-xl-4">
                <ProductCard data={item} hideWishlist={false} hidePopTool={true} hideCart={true} hideAddCartPop={true} titleclassname={"text-center text-color-primary"} priceclassname={"text-center text-color-danger"}/>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default MyaccountDashboard