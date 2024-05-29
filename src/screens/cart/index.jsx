import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  async function getCart() {
    await axios.get('http://127.0.0.1:5000/api/carts', { headers: { Authorization: token } }).then((res) =>{
      setCartItems(res?.data?.data?.products);
      setCart(res?.data?.data)
    }).catch(err => console.log(err));  
  }
  
  useEffect(() => {
    if(token) getCart()
  }, [])
 
  const removeFromCart = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/carts/${id}`, { headers: { Authorization: token } }).then((res) =>{
      setCartItems(cartItems.filter(item => item.product._id !== id ));
    }).catch(err => console.log(err));
 };
 
  const increaseQuantity = (id) => {
    async function increaseQua() {
      await axios.post(`http://127.0.0.1:5000/api/carts/${id}`, {
        action: "increase"
      }, { headers: { Authorization: token } }).then((res) => {
        setCartItems(cartItems.map(item => item.product._id === id ? { ...item, quantity: item.quantity + 1 } : item));
      }).catch(err => console.log(err));  
    }
    increaseQua();
  };
 
  const decreaseQuantity = (id) => {
    async function increaseQua() {
      await axios.post(`http://127.0.0.1:5000/api/carts/${id}`, {
        action: "decrease"
      }, { headers: { Authorization: token } }).then((res) => {
        setCartItems(cartItems.map(item => item.product._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
      }).catch(err => console.log(err));  
    }
    increaseQua();
  };
 
  return (
    <div style={{ padding: '20px' }}>
      { cartItems.map(item => (
        <Card key={item._id} style={{ marginBottom: '10px', display: 'flex',justifyContent:"center",alignContent:"center",alignItems:"center" }}>
          <CardMedia
            component="img"
            style={{ width: 150 }}
            image={item?.product?.image}
            alt={item?.product?.name}
          />
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between", flex: 1 }}>
            <CardContent>
              <Typography variant="h5">{item?.product?.name}</Typography>
              <Typography color="textSecondary">₹{item?.product?.price}</Typography>
              <Typography variant="body2">Quantity: {item?.quantity}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Button size="small" onClick={() => increaseQuantity(item?.product?._id)} style={{ backgroundColor: "lightgreen" , fontSize: '20px' }}>+</Button>
              <Button size="small" onClick={() => decreaseQuantity(item?.product?._id)} style={{ backgroundColor: "lightcoral" , fontSize: '20px'}}>-</Button>
              <Button size="small" color="secondary" onClick={() => removeFromCart(item?.product?._id)}>Remove</Button>
            </CardActions>
          </div>
        </Card>
      ))}
      <Typography variant="h6" style={{ marginTop: '20px',display:"flex",justifyContent:"flex-end" }}>
        Total: ₹{cartItems.reduce((total, item) => total + item?.product?.price * item.quantity, 0).toFixed(2)}
      </Typography>
      <Button variant="contained" onClick={()=>navigate(`/payment?user_id=${cart.user}`)} sx={{ marginTop: "20px" }}>
          Pay
        </Button>
    </div>
  );
};
 
export default Cart;
 