import  { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firstLetterCapital } from '../../commonMethod/common';
import ProductCard from './ProductCard';
import "../../Styles/product.css";
import PaginationCommon from './PaginationCommon';

const Products = ({ data }) => {
    const location = useLocation();
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const category = segments[segments.length - 1];

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // show 5 products per page

    // calculate start & end indexes
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // slice data for current page
    const currentData = data?.slice(startIndex, endIndex);

    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className='container'>
                <p className='mb-5 linear-bg px-3 py-2 secondary-text-color'>
                    {firstLetterCapital(category)}
                </p>
                <div className='product-grid'>
                    {currentData?.map((item, idx) => (
                        <div key={idx}>
                            <ProductCard data={item} />
                        </div>
                    ))}
                </div>
                <PaginationCommon
                    data={data}
                    handlePage={handlePage}
                    currentPage={currentPage}
                    visibleLength={itemsPerPage}
                    parentClass={"pt-2 mb-5"}
                />
            </div>
        </div>
    );
};

export default Products;
