const CategoryLoader = () => {
    return (
        <div className='card-category  linear-bg shadow-lg mb-5'>
            <img src={""} className='category-image is-loading w-100' />
            <span className='is-loading mt-3 d-block w-75 mx-auto category-nav'></span>
            <div className="category-des text-center px-4 pb-3"></div>
        </div>
    )
}
export default CategoryLoader