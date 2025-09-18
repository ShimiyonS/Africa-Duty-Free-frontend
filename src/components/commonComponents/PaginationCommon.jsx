import React, { useCallback, useEffect, useState } from 'react'
import "../../Styles/product.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const PaginationCommon = ({ parentClass, data, handlePage, currentPage = 1, visibleLength = 5 }) => {
    const maxVisiblePages = 5;
    const totalPages = Math.ceil(data?.length / visibleLength) || 1;
    const [visiblePages, setVisiblePages] = useState(Array.from({ length: Math.min(totalPages, maxVisiblePages) }, (_, index) => index + 1));

    const updateVisiblePages = useCallback((currentPage) => {
        const newStartPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const newEndPage = Math.min(totalPages, newStartPage + maxVisiblePages - 1);
        setVisiblePages([...Array(newEndPage - newStartPage + 1)].map((_, index) => newStartPage + index));
    }, [maxVisiblePages, totalPages]);

    useEffect(() => {
        updateVisiblePages(currentPage);
    }, [currentPage, totalPages, updateVisiblePages]);

    return (
        <>
            <div className={`pagination-custom d-flex justify-content-start align-items-center flex-wrap  ${parentClass}`}>
                {/* <p className="pe-2 text-center mb-2 mb-sm-0 resultText">
                    {'Showing'} {(currentPage - 1) * 10} {'to'}{" "}
                    {Math.min(currentPage * 10, data?.length)} {'of'}{" "}
                    {data?.length} {'results'}
                </p> */}
                <div>
                    <button
                        onClick={() => handlePage(1)}
                        disabled={currentPage === 1}
                        className={`${currentPage === 1 && "d-none"} arrowButton bg-transparent pagination-button`}
                    >
                        First
                    </button>
                    <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className={` ${currentPage === 1 && "d-none"} arrowButton pagination-button bg-transparent `}> <FaChevronLeft /></button>
                    {visiblePages?.map((pageNumber) => (<button key={pageNumber} onClick={() => handlePage(pageNumber)} className={`bg-transparent  pagination-button ${currentPage === pageNumber ? "active  border border-2" : ""} pagination-item `} > {pageNumber} </button>))}
                    <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages} className={` ${currentPage === totalPages && "d-none"} arrowButton bg-transparent pagination-button`}> <FaChevronRight /> </button>
                    <button
                        onClick={() => handlePage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`${currentPage === totalPages && "d-none"} arrowButton bg-transparent pagination-button`}
                    >
                        Last
                    </button>
                </div>
            </div>
        </>
    )
}
export default PaginationCommon
