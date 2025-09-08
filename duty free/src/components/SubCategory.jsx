import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SubCategory = ({ subCategorys }) => {
    const location = useNavigate()
    const categoryHandler = (slug) => {
        console.log(slug)
        location(`/product-category/beauty/${slug}`)
    }
    return (
        <div className=' sub-category-page-container'>
            {subCategorys.map((subCategory, idex) =>
                <div className='sub-category-container' key={idex}>
                    <div onClick={() => categoryHandler(subCategory?.slug)} className='sub-category-name'>{subCategory?.subcategoryName}</div>
                    {console.log(subCategory.products)}
                    <Link to={`/beauty/${subCategory?.slug}`} className="sub-category-image">
                        <img src={subCategory.products[0]?.imageUrl} height={200} className=' product-image' />
                    </Link>
                    <Link to={`/beauty/${subCategory?.slug}`} className={`$ product-title dmsans-bold d-block text-decoration-none mb-0 pt-2`}>{subCategory?.products[0]?.productName}</Link>
                    <p className={`$ product-price dmsans-bold `}>${subCategory?.products[0]?.price}</p>
                </div>
            )}
        </div>
    )
}

export default SubCategory