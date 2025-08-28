import React, { useState, useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";


const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-top p-0 overflow-hidden"
                >
                    <div className="position-relative d-flex align-items-center justify-content-center scroll-wrapper">
                        <IoIosArrowRoundUp size={20} />
                        <div className="button-overlay"></div>
                    </div>

                </button>
            )}
        </>
    );
};

export default ScrollToTop;
