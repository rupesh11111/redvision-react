import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './screens/signup/index';
import SignIn from './screens/signin';
import Navbar from './components/Navbar';
import SideBar from './components/sidebar';
import ProductList from './screens/productlist';
import ProductDetail from './screens/productDetail';
import Products from './screens/Products';
import Cart from './screens/cart';
import Payment from './screens/payment';
import PrivateRoute from './components/privateRoute';
import ProductForm from './screens/productForm';
import axios from 'axios';
import ProductUpdate from './screens/productUpdate';
import Order from './screens/Order';
import MyOrder from './screens/MyOrder';
import AdminRoute from './components/AdminRoute';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState(0);
  
  useEffect(() => {
    axios.get(`https://redvision-node.onrender.com/api/carts`, { headers: { Authorization: token } }).then((res) => setCart(res?.data?.data)).catch(err => console.log(err));
  }, [token])


  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      {token ? <Navbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} cart={cart} setToken={setToken} token={token} />: <div></div>}
        <SideBar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
        <Routes>
          <Route path="/signup" element={<SignUp setToken={setToken}/>} />
          <Route path="/products" element={ < AdminRoute Component={Products} />} />
          <Route path="/productCreate" element={ < AdminRoute Component={ProductForm} />} />
          <Route path="/productUpdate/:id" element={< AdminRoute Component={ProductUpdate} />} />
          <Route path="/signin" element={<SignIn setToken={setToken}/>} />
          <Route path="/dashboard" element={< AdminRoute Component={Products} />} />
          <Route path="/" element={< PrivateRoute Component={ProductList} />} />
          <Route path="/product/:id" element={< PrivateRoute Component={ProductDetail} />} />
          <Route path="/cart" element={< PrivateRoute Component={Cart} />} />
          <Route path="/myOrder" element={< PrivateRoute Component={MyOrder} />} />
          <Route path="/allOrder" element={< AdminRoute Component={Order} />} />
          <Route path="/payment" element={< PrivateRoute Component={Payment} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
