import Cart from "./Pages/Cart"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Pay from "./Pages/Pay"
import Product from "./Pages/Product"
import ProductList from "./Pages/ProductList"
import Register from "./Pages/Register"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Success from "./Pages/Success"
import { useSelector } from "react-redux"


function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={
            user ? <Navigate to='/' /> : <Login />
          } />
          <Route path='/register' element={
            user ? <Navigate to='/' /> : <Register />
          } />
          <Route path='/pay' element={<Pay />} />
          <Route path='/Success' element={<Success />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
