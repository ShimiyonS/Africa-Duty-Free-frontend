import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from 'react-router-dom';
import './App.css'
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NoPage from './pages/NoPage';
import CategoryRoute from './routes/CategoryRoute';
import ProductDetails from './pages/ProductDetails';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="/product-category/*" element={<CategoryRoute />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
