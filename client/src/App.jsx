import Cart from "./Pages/Cart"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Product from "./Pages/Product"
import ProductList from "./Pages/ProductList"
import Register from "./Pages/Register"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/productList' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
