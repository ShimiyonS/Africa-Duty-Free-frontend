import "../../Styles/category.css"
const SaleCard = ({ data, imageClass, headingClass }) => {
  return (
    <div className='container'>
      <div className='d-flex flex-wrap my-4 justify-content-center'>
        {data?.map((item) => {
          return (<>
            <div className='col-12 col-md-5 p-3'>
              <img src={item.image} className={`w-100 ${imageClass}`} />
              <p className={`sale-banner-heading mb-0 ${headingClass}`}>{item?.text}</p>
              <p className='sale-banner-des'>{item?.des}</p>
            </div>
          </>)
        })}
      </div>
    </div>
  )
}

export default SaleCard