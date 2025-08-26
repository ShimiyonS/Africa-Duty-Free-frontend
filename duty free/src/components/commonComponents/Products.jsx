import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Common from '../../commonMethod/Common';
import ProductCard from './ProductCard';
import "../../Styles/product.css";
import PaginationCommon from './PaginationCommon';
import EmptyCustom from './EmptyCustom';

const Products = ({ data, headingText }) => {
    const { slug } = useParams()
    const { firstLetterCapital } = Common()
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
                    {firstLetterCapital(slug || headingText)}
                </p>
                {currentData?.length ? <><div className='product-grid'>
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
                </>
                    : <EmptyCustom />}

            </div>
        </div>
    );
};

export default Products;
