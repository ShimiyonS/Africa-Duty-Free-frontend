import React from 'react'
import HoverZoomImage from './HoverZoomImage'
import Common from '../../commonMethod/Common'
import { clearCart } from '../../store/slice/viewCartSlice'
import { MdClose } from "react-icons/md";

const CardModal = () => {
    const { viewCart, dispatch } = Common()
    const handleClose = () => {
        dispatch(clearCart())
    }
    return (
        <div className='card-wrapper'>
            <div className='card-box d-flex  '>
                <div className='col-5'>
                    <HoverZoomImage src={viewCart?.data?.thumbnail} />
                </div>
                <div className='col-7'>
                    <p className='popup-cart-heading'>{viewCart?.data.title}</p>
                    <p className='gold-color'>${viewCart?.data?.price}</p>

                </div>
                <button onClick={() => { handleClose() }} className='border-0 position-absolute alert-btn shadow'><MdClose style={{ width: "20px", height: "20px" }} /></button>
            </div>
        </div>
    )
}

export default CardModal