import "../../Styles/category.css"
import SaleBannerOneFirst from "../../assets/salebanner1.jpg"
import SaleBannerOneTwo from "../../assets/salebanner2.jpg"
import SaleBannerOneThree from "../../assets/salebanner3.jpg"
const SaleCard = ({ data, imageClass, headingClass }) => {

  const saleFirst = [
    {
      image: SaleBannerOneFirst,
      text: "This week only",
      des: "Lancome Idole gift sets 20 % less"
    },
    {
      image: SaleBannerOneTwo,
      text: "This week only 40% of",
      des: ""
    }
  ]
  const saleSecond = [
    {
      image: SaleBannerOneFirst,
      text: "Travel exclusives",
      des: ""
    },
    {
      image: SaleBannerOneThree,
      text: "Members only offers",
      des: ""
    }
  ]
  const finalData = data == 1 ? saleSecond : saleFirst
  return (
    <div className='container'>
      <div className='d-flex flex-wrap gap-4 my-4 justify-content-center'>
        {finalData?.map((item) => {
          return (<>
            <div className='col-12 col-md-4 p-3 '>
              <img src={item.image} className={`w-100 ${imageClass}`} />
              <p className={`sale-banner-heading justuspro-medium mb-0 ${headingClass}`}>{item?.text}</p>
              <p className='sale-banner-des justuspro-regular'>{item?.des}</p>
            </div>
          </>)
        })}
      </div>
    </div>
  )
}

export default SaleCard