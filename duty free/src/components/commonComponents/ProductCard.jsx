import "../../Styles/product.css"
import { Link } from 'react-router-dom'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useMyContext } from "../../Provider/CommonProvider";
import { viewCard } from "../../store/slice/viewCardSlice";
import common from "../../commonMethod/common.js";
import { useEffect, useState } from "react";
import { setWishlist } from "../../store/slice/wishlistSlice.js";

const ProductCard = ({ data, hideWishlist, hidePopTool, hideCart, hideAddCartPop, imageheight = 200, titleclassname = "text-color-primary", priceclassname = "text-color-danger" }) => {
    const { handleOpenAlert } = useMyContext()
    const { apiRequest, dispatch, wishlistItems } = common()
    const userId = 1
    // const [wishlist, setWishlist] = useState([])
    const handleAddTocart = (data) => {
        handleOpenAlert({
            text: `${data?.title} has been added to your cart`,
            link: "/cart",
            linkText: "VIEW CART"
        })
    }

    const handleToggleWishList = (item) => {
        const exists = wishlistItems.find((i) => i.id === item.id);

        let updatedWishlist;
        if (exists) {
            // Remove the item
            updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
        } else {
            // Add the item
            updatedWishlist = [...wishlistItems, item];
        }

        dispatch(setWishlist(updatedWishlist));
        handleOpenAlert({
            text: `${item?.productName || item?.name} has been ${exists ? "removed" : "added"} to your whishlist`,
            link: "/wishlist",
            linkText: "VIEW WISHLIST"
        })
    };

    // const handleToggleWishList = async (data) => {

    // try {
    //     const response = await apiRequest("POST", `/auth/${userId}/wishlist/toggle`, { productId: data?.id })

    //     if (response.status) {
    //         setWishlist(response?.wishlist)

    //         handleOpenAlert({
    //             text: `${data?.productName} has been ${response?.action} to your whishlist`,
    //             link: "/wishlist",
    //             linkText: "VIEW WISHLIST"
    //         })
    //     }
    // } catch (error) {
    //     console.log(error.message);
    // }
    // }


    // useEffect(() => {
    //     const getWishList = async () => {
    //         try {
    //             const wishlist = await apiRequest("GET", `/auth/${userId}/wishlist`)
    //             setWishlist(wishlist?.wishlist)
    //         } catch (error) {
    //             console.log(error.message)
    //         }
    //     }
    //     getWishList()
    // }, [wishlist])

    return (
        <>
            <div className='p-2 position-relative product-card'>
                {/* {!hideWishlist && <button type="button" onClick={() => handleAddTowishlist(data)} className="bg-transparent border-0 heart-btn position-absolute"> <IoMdHeartEmpty /> </button>}
                <div className="position-relative overflow-hidden">
                    <Link to={`/product/${data.id}`}><img src={data?.thumbnail} height={imageheight} className='p-2 product-image' /></Link>
                    {!hidePopTool && <div className="d-flex align-items-center gap-2 position-absolute justify-content-center pop-tool">
                        {!hideCart && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleAddTocart(data)}><FaShoppingCart /></button>}
                        {!hideAddCartPop && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleOpenModal(data)}><FaEye /></button>}
                    </div>}
                </div>
*/}
                {!hideWishlist && <button type="button" onClick={() => handleToggleWishList(data)} className="bg-transparent border-0 heart-btn position-absolute">{wishlistItems.find((i) => i.id === data.id) ? <IoMdHeart /> : <IoMdHeartEmpty />}   </button>}
                <div>
                    <Link to={`/product/${data.slug}`} className="">
                        <img src={data?.imageUrl || data?.image_url} height={imageheight} className='p-2 product-image' />
                    </Link>
                    {!hidePopTool &&
                        <div className="d-flex align-items-center gap-2 position-absolute justify-content-center pop-tool">
                            {!hideCart && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleAddTocart(data)}><FaShoppingCart /></button>}
                            {!hideAddCartPop && <button className="border-0 px-3 py-2 rounded-1 bg-color-primary text-color-gold shadow" onClick={() => handleOpenModal(data)}><FaEye /></button>}
                        </div>
                    }
                </div>
                <Link to={`/product/${data?.slug}`} className={`${titleclassname} product-title dmsans-bold d-block text-decoration-none mb-0 pt-2`}>{data?.productName || data?.name}</Link>
                <p className={`${priceclassname} product-price dmsans-bold `}>${data?.price || data?.stocks[0]?.sales_price}</p>
            </div>
        </>
    )
}
export default ProductCard