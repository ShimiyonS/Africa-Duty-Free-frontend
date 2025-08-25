import "./SaleBanner.css"
const SaleBanner = ({content}) => {
    return (
        <div className='salebanner d-none d-lg-block'>
            <h6 className='text-center m-0 salebanner-content'>
                {content}
            </h6>
        </div>
    )
}

export default SaleBanner