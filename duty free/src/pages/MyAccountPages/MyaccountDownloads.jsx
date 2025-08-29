import React from 'react'
import { Link } from 'react-router-dom'

const MyaccountDownloads = () => {
    return (
        <div>
            <Link to="/shop" className='d-block text-center text-decoration-none'>Browse product</Link>
            <p className='mt-3'>No downloads available yet. Browse products</p>
        </div>
    )
}

export default MyaccountDownloads