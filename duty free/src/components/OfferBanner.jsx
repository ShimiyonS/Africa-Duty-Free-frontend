import React from 'react'
import "../Styles/components.css"
import product1 from "../assets/images/product1.jpg"

const defaultOfferBanner = [
    {
        image: product1,
        name: "This week only",
        category: "fragrances",
        offerRate: "28",
        originalPrice: "33"
    },
    {
        image: product1,
        name: "This week only",
        category: "beverage",
        offerRate: "28",
        originalPrice: "55"
    }
]
const OfferBanner = ({ type = 1, values = defaultOfferBanner }) => {
    const renderBanner = () => {
        switch (type) {
            case 1:
                return <div className='offer-banner-container'>
                    {values?.map((value, idx) =>
                        <div className="d-flex p-0 col-12 col-xl-5 col-lg-6 col-md-6 col-sm-12 offers justify-content-center" key={idx}>
                            <div className="col-6 offerbanner bg-color-gold">
                                <p className="text-color-secondary justuspro-regular">This week only beverage.</p>
                                <p className="mb-0 text-color-secondary justuspro-regular">Pommery</p>
                                <p className="text-color-secondary justuspro-regular"><span className="text-decoration-line-through fs-6 text-color-secondary justuspro-regular">$30</span> $20</p>
                            </div>
                            <div className="col-6">
                                <img width={"100%"} height={"100%"} src={value?.image}></img>
                            </div>
                        </div>
                    )}
                </div>;
            case 2:
                return <div>Offer Banner 2</div>;
            case 3:
                return <div>Offer Banner 3</div>;
            default:
                return <div>Default Banner</div>;
        }
    };
    return (
        <div>{renderBanner()}</div>
    )
}

export default OfferBanner