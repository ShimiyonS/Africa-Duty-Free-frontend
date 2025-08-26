import HoverZoomImage from './HoverZoomImage'
import Common from '../../commonMethod/Common'
import { clearCart, viewCart } from '../../store/slice/viewCartSlice'
import { MdClose } from "react-icons/md";
import { useMyContext } from '../../Provider/CommonProvider';
import { Link } from 'react-router-dom';

const CardModal = () => {
    const { handleOpenAlert } = useMyContext()
    const { getActiveCart, dispatch } = Common()
    const handleClose = () => {
        dispatch(clearCart())
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        let updatedData = {
            ...getActiveCart?.data,
            [name]: value
        }
        dispatch(viewCart(updatedData))
    }
    const handleAddTocart = (data) => {
        handleOpenAlert({
            text: `${data?.title} has been added to your cart`,
            link: "/cart",
            linkText: "VIEW CART"
        })
    }
    return (
        <div className='card-wrapper'>
            <div className='card-box d-flex  '>
                <div className='col-5'>
                    <HoverZoomImage src={getActiveCart?.data?.thumbnail} />
                </div>
                <div className='col-7'>
                    <p className='popup-cart-heading'>{getActiveCart?.data.title}</p>
                    <p className='gold-color price-tag'>${getActiveCart?.data?.price}</p>
                    <div className='d-flex  pb-3 align-items-center gap-3 card-count-wrapper'>
                        <input type='number' name={"minimumOrderQuantity"} onChange={(e) => handleChange(e)} className=' popup-count-input' value={getActiveCart?.data?.minimumOrderQuantity} />
                        <button type='button' className='pop-add-btn border-0' onClick={() => handleAddTocart(getActiveCart?.data)}>ADD TO CART</button>
                    </div>
                    <div className='d-flex  mt-2 align-items-center gap-3'>
                        <p className='mb-0'>Category</p>
                        {getActiveCart?.data?.reviews?.map((item) => { return <Link to={`/product-category/${item?.reviewerName}`} className='link-custom text-decoration-none'>{item?.reviewerName},</Link> })}
                    </div>
                </div>
                <button onClick={() => { handleClose() }} className='border-0 position-absolute alert-btn shadow'><MdClose style={{ width: "20px", height: "20px" }} /></button>
            </div>
        </div>
    )
}

export default CardModal