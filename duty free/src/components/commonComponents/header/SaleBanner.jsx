import "./SaleBanner.css"
const SaleBanner = ({content}) => {
    return (
        <div className='salebanner d-none d-lg-block'>
            <p className='text-center m-0 salebanner-content'>
                {content}
            </p>
        </div>
    )
}

export default SaleBanner