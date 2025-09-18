import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SubCategory = ({ subCategorys }) => {
    const { slug, subslug } = useParams();
    return (
        <div className=' sub-category-page-container'>
            {subCategorys.map((subCategory, idex) =>
                <div className='sub-category-container' key={idex}>
                    <Link to={`/product-category/${slug}/${subCategory?.slug}`} className='sub-category-name text-decoration-none'>{subCategory?.subcategoryName}</Link>
                    <Link to={`/product-category/${slug}/${subCategory?.slug}`} className="sub-category-image">
                        <img src={subCategory?.image} height={200} className=' product-image' />
                    </Link>
                    <Link to={`/product/${subCategory?.products[0]?.slug}`} className={`$ product-title dmsans-bold d-block text-decoration-none mb-0 pt-2`}>{subCategory?.products[0]?.productName}</Link>
                    <p className={`$ product-price dmsans-bold `}>${subCategory?.products[0]?.price}</p>
                </div>
            )}
        </div>
    )
}

export default SubCategory