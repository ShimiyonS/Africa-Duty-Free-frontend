import "../../Styles/product.css"
import { Link } from 'react-router-dom'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useMyContext } from "../../Provider/CommonProvider";
import common from "../../commonMethod/common.js";
import { toast } from "react-toastify";

const ProductCard = ({ data, hideWishlist, hidePopTool, hideCart, hideAddCartPop, imageheight = 200, titleclassname = "text-color-primary", priceclassname = "text-color-danger" }) => {
    const { handleOpenAlert } = useMyContext()
    const user = JSON.parse(localStorage.getItem("user"))
    const { wishlistItems, toggleUserWishlist } = common()
    const handleAddTocart = (data) => {
        handleOpenAlert({
            text: `${data?.title} has been added to your cart`,
            link: "/cart",
            linkText: "VIEW CART"
        })
    }
    const handleToggleWishList = async (item) => {
        if (!user) {
            toast.error("please login")
            return
        }
        await toggleUserWishlist(user?.id, item?.id)
        handleOpenAlert({
            text: `${item?.productName || item?.name} has been ${wishlistItems.includes(item?.id) ? "removed" : "added"} to your whishlist`,
            link: "/wishlist",
            linkText: "VIEW WISHLIST"
        })
    };

    return (
        <>
            <div className='p-2 position-relative product-card'>
                {!hideWishlist &&
                    <button type="button" onClick={() => handleToggleWishList(data)} className="bg-transparent border-0 heart-btn position-absolute">{wishlistItems.find((i) => i.id === data.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}   </button>
                }
                <div>
                    <Link to={`/product/${data?.xid || data?.slug}`} className="">
                        <img src={data?.imageUrl || data?.image_url} height={imageheight} className='p-2 product-image' />
                    </Link>
                    {!hidePopTool &&
                        <div className="d-flex align-items-center gap-2 position-absolute justify-content-center pop-tool">
                            {!hideCart && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleAddTocart(data)}><FaShoppingCart /></button>}
                            {!hideAddCartPop && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleOpenModal(data)}><FaEye /></button>}
                        </div>
                    }
                </div>
                <Link to={`/product/${data?.xid || data?.slug}`} className={`${titleclassname} product-title dmsans-bold d-block text-decoration-none mb-0 pt-2`}>{data?.productName || data?.name}</Link>
                <p className={`${priceclassname} product-price dmsans-bold `}>${data?.price || data?.stocks?.[0]?.sales_price}</p>
            </div>
        </>
    )
}
export default ProductCard