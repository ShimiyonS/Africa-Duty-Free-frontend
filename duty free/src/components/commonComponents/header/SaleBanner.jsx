import "./SaleBanner.css"
const SaleBanner = ({content}) => {
    return (
        <div className='linear-bg d-none d-lg-block'>
            <h6 className='text-center m-0 justuspro-regular salebanner-content text-color-secondary'>
                {content}
            </h6>
        </div>
    )
}

export default SaleBanner