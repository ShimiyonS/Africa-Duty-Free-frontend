import "../../Styles/product.css"
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useMyContext } from "../../Provider/CommonProvider";
import { viewCart } from "../../store/slice/viewCartSlice";
import Common from "../../commonMethod/Common";

const ProductCard = ({ data, hideWishlist, hidePopTool,hideCart,hideAddCartPop, titleclassname, priceclassname }) => {
    const { handleOpenAlert } = useMyContext()
    const { dispatch } = Common()

    const handleAddTocart = (data) => {
        handleOpenAlert({
            text: `${data?.title} has been added to your cart`,
            link: "/cart",
            linkText: "VIEW CART"
        })
    }
    const handleOpenModal = (data) => {
        dispatch(viewCart(data));
    }
    return (
        <div className='p-2 position-relative product-card'>
            {!hideWishlist && <button onClick={null} className="bg-transparent border-0 heart-btn position-absolute"><IoMdHeartEmpty /></button>}
            <div className="position-relative overflow-hidden">
                <img src={data?.thumbnail} className='p-2 product-image' />
                {!hidePopTool && <div className="d-flex align-items-center gap-2 position-absolute justify-content-center pop-tool">
                    {!hideCart && <button className="border-0 px-3 py-2 rounded-1" onClick={() => handleAddTocart(data)}><FaShoppingCart /></button>}
                    {!hideAddCartPop && <button className="border-0 px-3 py-2 rounded-1" onClick={() => handleOpenModal(data)}><FaEye /></button>}
                </div>}
            </div>
            <Link to={`/product/${data?.id}`} className={`${titleclassname} product-title d-block text-decoration-none mb-0 pt-3 pb-2`}>{data?.title}</Link>
            <p className={`${priceclassname} product-price`}>${data?.price}</p>
        </div>
    )
}
export default ProductCard