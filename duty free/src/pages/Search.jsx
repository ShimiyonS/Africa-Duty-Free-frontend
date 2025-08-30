import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Common from '../commonMethod/Common';
import NewProducts from '../components/commonComponents/NewProducts';
import NotFound from '../components/commonComponents/NotFound';
const Search = () => {
    const [searchParams] = useSearchParams();

    const { apiRequest } = Common()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", `/products/search?q=${searchParams?.get("q")}`);
            setProducts(data?.products)
        };
        fetchProducts();
    }, [searchParams])
    return (
        <div>
            {products.length !== 0 ?  
                <NewProducts heading={"Search Result"} productsdata={products} parentClassName={"mt-5"} /> :
                <NotFound/>
            }
        </div>
    )
}

export default Search