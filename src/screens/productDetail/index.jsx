import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const token = localStorage.getItem('token')
    let authUser = localStorage.getItem('user') || "{}"
    authUser = (authUser == undefined) ? "{}" : authUser;
    authUser = JSON.parse(authUser)
  
    useEffect(() => {
        axios.get(`https://redvision-node.onrender.com/api/products/${id}`, { headers: { Authorization: token } }).then((res) => setProduct(res?.data?.data)).catch(err => console.log(err));
    }, [token])

    const addToCart = (productId) => {
        const bodyData = { productId, quantity: 1 }; // Add any other necessary data here
        axios.post(`https://redvision-node.onrender.com/api/carts`,bodyData, { headers: { Authorization: token } }).then((res) => console.log(res)).catch(err => console.log(err));
    };

    return (
        <Box sx={{ width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: { xs: '40px', sm: '40px', md: '0px', lg: '0px', xl: '0px' } }}>

            <Box sx={{ width: { xs: '100%', sm: '100%', md: '70%', lg: '70%', xl: '70%' }, height: '60%', display: 'flex', gap: '10px', flexDirection: { xs: 'column-reverse', sm: 'row', md: 'row', lg: 'row', xl: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ width: { xs: '90%', sm: '90%', md: '60%', lg: '60%', xl: '60' }, height: '100%', padding: '20px' }}>
                    <Typography sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'left' }}>
                        {product.name}
                    </Typography>
                    <Box sx={{ margin: "20px 0px 20px 0px" }}>
                        <Typography sx={{ fontSize: '16px', textAlign: 'left', color: 'grey' }}>
                            {product.description}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '25px', textAlign: 'left', color: 'grey', lineHeight: '120px' }}>
                        Rs {product.price} /-
                    </Typography>

                    {authUser.role == "admin" || <Button fullWidth variant='contained' sx={{ marginTop: '20px' }} onClick={() => addToCart(product._id)}>Add to Cart</Button>}

                </Box>
                <Box sx={{ width: { xs: '100%', sm: '100%', md: '35%', lg: '35%', xl: '35%' }, height: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%' } }}>
                    <img style={{ width: '100%', height: '100%', borderRadius: '5px' }} src={product.image} alt="product" />
                </Box>
            </Box>
        </Box>
    )
}
export default ProductDetail