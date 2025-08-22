import "../Styles/category.css"
import { Route, Routes } from 'react-router-dom'
import NoPage from '../pages/NoPage'
import About from '../pages/About'
import CategoryDetails from '../pages/CategoryDetails'
import Banner1 from "../assets/categorybanner-1.jpg"

const CategoryRoute = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route path="/fragrances" element={<CategoryDetails bannerDetails={{ image: Banner1, description: "Discover your signature beauty" }} breadNavigation={[{ key: "home", nav: "/" }, { key: "products", nav: "/shop" }, { key: "fragrances", nav: "" }]} />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NoPage />} />
            {/* </Route> */}
        </Routes>
    )
}

export default CategoryRoute