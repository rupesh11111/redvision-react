import logo from './logo.svg';
import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './screens/signup/index';
import SignIn from './screens/signin';
import Navbar from './components/Navbar';
import SideBar from './components/sidebar';
import Dashboard from './screens/dashboard';
import ProductList from './screens/productlist';
import ProductDetail from './screens/productDetail';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <SideBar setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={ <SignIn />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/productlist" element={ <ProductList />} />
        <Route path="/product/:id" element={ <ProductDetail />} />
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
