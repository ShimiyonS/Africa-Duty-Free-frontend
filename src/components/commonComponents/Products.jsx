import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Common from '../../commonMethod/common';
import ProductCard from './ProductCard';
import "../../Styles/product.css";
import PaginationCommon from './PaginationCommon';
import EmptyCustom from './EmptyCustom';

const Products = ({ data, headingText, paraClassName, gridplacement, hidePagnation, imageheight, hidePopTool }) => {
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
                <p className={`mb-4 px-md-3 px-1  py-2 justuspro-medium ${paraClassName}`}>
                    {firstLetterCapital(slug ?? headingText ?? "")}
                </p>
                {currentData?.length ? <><div className={`${gridplacement}`}>
                    {currentData?.map((item, idx) => (
                        <div key={idx}>
                            <ProductCard data={item} imageheight={imageheight} hidePopTool={hidePopTool} />
                        </div>
                    ))}

                </div>
                    {!hidePagnation && <PaginationCommon
                        data={data}
                        handlePage={handlePage}
                        currentPage={currentPage}
                        visibleLength={itemsPerPage}
                        parentClass={"pt-2 mb-5"}
                    />}
                </>
                    : <EmptyCustom />}

            </div>
        </div>
    );
};

export default Products;
