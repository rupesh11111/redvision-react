import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    handleApi()
  }, [token])

  const handleApi = () => {
    axios.get('https://redvision-node.onrender.com/api/products', { headers: { Authorization: token } }).then((res) => setProducts(res?.data?.data)).catch(err => console.log(err));
  }

  return (
    <Box
      sx={{
        marginTop: "20px",
        padding: "40px",
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      {Object.values(products)?.map((e, i) => {
        return (
          <Card key={i} sx={{ width: "300px", minHeight: "200px", cursor: "pointer" }} onClick={() => navigate('/product/' + e._id)}>
            <CardContent>
              <CardMedia
                component="img"
                height="194"
                image={e.image}
                alt="Paella dish"
              />
              <Typography
                sx={{ fontSize: 16, lineHeight: "50px", fontWeight: "bold", textAlign: 'left' }}
                color="text.secondary"
                gutterBottom
              >
                {e.name}
              </Typography>
              <Typography
                sx={{ fontSize: 13, lineHeight: "10px", textAlign: 'left' }}
                color="text.secondary"
                gutterBottom
              >
                {e.description}
              </Typography>
              <Typography
                sx={{ fontSize: 16, lineHeight: "50px", fontWeight: "bold", textAlign: 'left' }}
                color="text.secondary"
                gutterBottom
              >
                Rs {e.price} /-
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
export default ProductList;
