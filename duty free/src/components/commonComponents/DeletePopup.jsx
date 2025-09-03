import React from 'react'

const DeletePopup = ({ alertmessage, handleclose, handleDelete , data }) => {
    return (
        <div className='delete-popup'>
            <div className='delete-popup-content'>
                <p className='fw-bold'>{alertmessage}</p>
                <img className='d-block mx-auto' src={data?.images?.[0] || data?.image} width={100} height={100} alt="deleting product" />
                <button
                    className='px-3 py-2 border-0 button-bg-primary text-color-secondary rounded-2'
                    onClick={() => handleclose()}
                >
                    Cancel
                </button>
                <button
                    className='ms-4 px-3 py-2 border-0 button-bg-danger text-color-secondary rounded-2'
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeletePopup