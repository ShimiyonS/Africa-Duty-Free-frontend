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
            <div className='card-box d-flex flex-column flex-xl-row col-11 col-md-7 mx-auto'>
                <div className='col-12 col-xl-6'>
                    <HoverZoomImage src={getActiveCart?.data?.thumbnail} />
                </div>
                <div className='col-12 col-xl-6'>
                    <p className='popup-cart-heading justuspro-medium'>{getActiveCart?.data.title}</p>
                    <p className='text-color-gold dmsans-bold price-tag'>${getActiveCart?.data?.price}</p>
                    <div className='d-flex flex-column flex-md-row  pb-3 align-items-center gap-3 card-count-wrapper'>
                        <input type='number' name={"minimumOrderQuantity"} onChange={(e) => handleChange(e)} className=' popup-count-input dmsans-bold p-0 py-md-3 px-md-4' value={getActiveCart?.data?.minimumOrderQuantity} />
                        <button type='button' className='pop-add-btn border-0 bg-color-secondary dmsans-bold text-color-secondary' onClick={() => handleAddTocart(getActiveCart?.data)}>ADD TO CART</button>
                    </div>
                    <div className='d-flex flex-column flex-md-row  mt-2 align-items-center gap-3'>
                        <p className='mb-0'>Categories</p>
                        {getActiveCart?.data?.reviews?.map((item) => { return <Link to={`/product-category/${item?.reviewerName}`} className='text-color-danger text-decoration-none'>{item?.reviewerName},</Link> })}
                    </div>
                </div>
                <button onClick={() => { handleClose() }} className='border-0 position-absolute alert-btn shadow'><MdClose className='popup-cart-close' /></button>
            </div>
        </div>
    )
}

export default CardModal